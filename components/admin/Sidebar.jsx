import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-[13rem] h-screen border-r p-2">
      <Link
        href="/dashboard"
        className="flex-center items-center rounded-md p-2 bg-blue-50 border"
      >
        Resto Menu
      </Link>
    </div>
  );
};

export default Sidebar;
