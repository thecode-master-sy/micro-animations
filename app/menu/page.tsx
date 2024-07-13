import SideBar from "./_components/Sidebar";

export default function Page() {
	return (
		<div className="min-w-full bg-menu-background min-h-screen rounded-md p-3">
			<div className="flex">
				<SideBar />
			</div>
		</div>
	);
}
