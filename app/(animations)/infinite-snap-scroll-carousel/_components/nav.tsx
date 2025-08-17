export default function Nav() {
  return (
    <div className="uppercase p-4 flex justify-between tracking-tighter">
      <div>Showcase by thecodemaster</div>

      <ul className=" gap-3 hidden md:flex">
        <li>Home</li>
        <li>Work</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>

      <button className="uppercase text-right">See inspirations</button>
    </div>
  );
}
