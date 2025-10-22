import logo from "../../public/logo.png";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className="w-full flex items-center justify-center mx-auto px-4 py-6">
        <Image
          src={logo}
          alt="Agentic Todo Sim Logo"
          width={60}
          height={60}
          className="mr-4 rounded-4xl border-2 border-accent p-1"/>
        <h1 className="text-3xl font-bold text-center">
          Agentic Todo Sim
        </h1>
      </div>
    </header>
  );
};

export default Header;
