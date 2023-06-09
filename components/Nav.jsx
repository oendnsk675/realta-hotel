import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="w-full flex-between py-2 px-6 border-b-2">
      <div className="flex items-center gap-32">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <span className="logo_text">Realta</span>
        </div>
        <div className="flex gap-6">
          <Link href={"/resto/menu"}>Resto</Link>
          <Link href={"/admin"}>Admin</Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-slate-500"></div>
        <span>Guest</span>
      </div>
    </nav>
  );
};

export default Nav;
