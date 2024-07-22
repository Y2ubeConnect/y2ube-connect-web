import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <header className="px-10 py-5 bg-gray-900 sticky top-0 left-0">
      <ul className="flex justify-between">
        <li className="flex items-center">
          <Link href="/" className="font-semibold text-xl text-white">
            Y2ubeConnect
          </Link>
        </li>
        <li className="flex items-center">
          <LogoutButton />
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
