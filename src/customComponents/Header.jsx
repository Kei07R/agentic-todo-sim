import logo from "../../public/logo.png";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className="w-full flex items-center justify-center mx-auto px-4 py-6">
        <Image
          src={logo}
          alt="Agentic Todo Sim Logo"
          width={50}
          height={50}
          className="mr-4 rounded-4xl"/>
        <h1 className="text-3xl font-bold text-center">
          Agentic Todo Sim
        </h1>
      </div>
    </header>
  );
};

export default Header;
