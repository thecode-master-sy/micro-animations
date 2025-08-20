import { gsap } from "gsap";

interface HorizontalLoopConfig {
  paused?: boolean;
  draggable?: boolean;
  center?: boolean | HTMLElement;
  speed?: number;
  snap?: number | false | ((value: number) => number);
  repeat?: number;
  reversed?: boolean;
  paddingRight?: string | number;
  onChange?: (element: HTMLElement, index: number) => void;
}

export function horizontalLoop(items: HTMLElement[], config: HorizontalLoopConfig = {}) {
  let timeline;
  const itemsArray = gsap.utils.toArray(items) as HTMLElement[];

  gsap.context(() => {
    const onChange = config.onChange;
    let lastIndex = 0;

    const tl = gsap.timeline({
      repeat: config.repeat,
      onUpdate:
        onChange &&
        function () {
          const i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(itemsArray[i], i);
          }
        },

      paused: config.paused,
      defaults: {
        ease: "none",
      },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      },
    });

    const length = itemsArray.length;
    const startX = (itemsArray[0] as HTMLElement).offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const spaceBefore: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;
    let indexIsDirty = false;

    const center = config.center;
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap =
      config.snap === false
        ? (v: number) => v
        : gsap.utils.snap((config.snap as number) || 1);
    let timeOffset = 0;
    const container =
      center === true
        ? itemsArray[0].parentNode
        : gsap.utils.toArray(center as HTMLElement)[0] || itemsArray[0].parentNode;

    let totalWidth: number;

    let timeWrap: (value: number) => number;

    const getTotalWidth = () => {
      const lastItem = itemsArray[length - 1] as HTMLElement;
      const lastItemScaleX = gsap.getProperty(lastItem, "scaleX") as number;
      return (
        lastItem.offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        lastItem.offsetWidth * lastItemScaleX +
        (parseFloat(config.paddingRight as string) || 0)
      );
    };

    const populateWidths = (): void => {
      const containerRect = (container as HTMLElement).getBoundingClientRect();
      let b1 = containerRect;
      let b2: DOMRect;

      itemsArray.forEach((el, i) => {
        const element = el as HTMLElement;
        widths[i] = parseFloat(
          gsap.getProperty(element, "width", "px") as string
        );
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(element, "x", "px") as string) /
            widths[i]) *
            100 +
            parseFloat(gsap.getProperty(element, "xPercent") as string)
        );
        b2 = element.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });

      gsap.set(itemsArray, {
        xPercent: (i: number) => xPercents[i],
      });
      totalWidth = getTotalWidth();
    };

    const populateOffsets = (): void => {
      const containerWidth = (container as HTMLElement).offsetWidth;
      timeOffset = center
        ? (tl.duration() * (containerWidth / 2)) / totalWidth
        : 0;

      if (center) {
        times.forEach((t, i) => {
          times[i] = timeWrap(
            tl.labels[`label${i}`] +
              (tl.duration() * widths[i]) / 2 / totalWidth -
              timeOffset
          );
        });
      }
    };

    const getClosest = (
      values: number[],
      value: number,
      wrap: number
    ): number => {
      let i = values.length;
      let closest = 1e10;
      let index = 0;
      let d: number;

      while (i--) {
        d = Math.abs(values[i] - value);
        if (d > wrap / 2) {
          d = wrap - d;
        }
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    };

    const populateTimeline = (): void => {
      let i: number,
        item: HTMLElement,
        curX: number,
        distanceToStart: number,
        distanceToLoop: number;
      tl.clear();

      for (i = 0; i < length; i++) {
        item = itemsArray[i] as HTMLElement;
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        distanceToLoop =
          distanceToStart +
          widths[i] * parseFloat(gsap.getProperty(item, "scaleX") as string);

        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add(`label${i}`, distanceToStart / pixelsPerSecond);

        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    };

    const refresh = (deep?: boolean): void => {
      const progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      if (deep) populateTimeline();
      populateOffsets();
      if (deep && tl.draggable && tl.paused()) {
        tl.time(times[curIndex], true);
      } else {
        tl.progress(progress, true);
      }
    };

    const onResize = (): void => refresh(true);

    let proxy: HTMLElement;

    gsap.set(itemsArray, { x: 0 });

    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);

    function toIndex(index: number, vars: gsap.TweenVars = {}) {
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }

      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];

      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }

      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }

      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);

      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }

    tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);

    tl.closestIndex = (setCurrent?: boolean): number => {
      const index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };

    tl.current = (): number =>
      indexIsDirty ? tl.closestIndex(true) : curIndex;
    tl.next = (vars?: gsap.TweenVars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars?: gsap.TweenVars) => toIndex(tl.current() - 1, vars);
    tl.times = times;

    tl.progress(1, true).progress(0, true);

    if (config.reversed) {
      (tl.vars as any).onReverseComplete();
      tl.reverse();
    }

    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      const wrap = gsap.utils.wrap(0, 1);

      let ratio: number,
        startProgress: number,
        draggable: any,
        lastSnap: number,
        initChangeX: number,
        wasPlaying: boolean;

      const align = () => {
        tl.progress(
          wrap(startProgress + (draggable.startX - draggable.x) * ratio)
        );
      };
      const syncIndex = () => tl.closestIndex(true);

      if (typeof InertiaPlugin === "undefined") {
        console.warn(
          "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
        );
      }

      draggable = Draggable.create(proxy, {
        trigger: itemsArray[0].parentNode as gsap.DOMTarget,
        type: "x",
        onPressInit() {
          const x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value: number) {
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX;
          }
          const time = -(value * ratio) * tl.duration();
          const wrappedTime = timeWrap(time);
          const snapTime = times[getClosest(times, wrappedTime, tl.duration())];
          let dif = snapTime - wrappedTime;

          if (Math.abs(dif) > tl.duration() / 2) {
            dif += dif < 0 ? tl.duration() : -tl.duration();
          }
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          if (draggable.isThrowing) {
            indexIsDirty = true;
          }
        },
        onThrowComplete: () => {
          syncIndex();
          if (wasPlaying) tl.play();
        },
      })[0];

      tl.draggable = draggable;
    }

    tl.closestIndex(true);
    lastIndex = curIndex;
    if (onChange) {
      onChange(itemsArray[curIndex], curIndex);
    }
    timeline = tl;

    // Return cleanup function
    return () => window.removeEventListener("resize", onResize);
  });

  return timeline;
}
