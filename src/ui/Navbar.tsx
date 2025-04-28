import Link from "next/link";
import { ReactNode } from "react";
import DarkModeSelector from "./components/DarkModeSelector";
export default function Navbar() {
  return (
    <>
      <nav className="p-2 px-4 text-2xl flex justify-between">
        <div className="left-side flex space-x-4 items-center">
          <Link href="/" className="font-bold mr-8">
            Welon Blog
          </Link>

          <NavbarItem href="about">about</NavbarItem>

          <NavbarItem href="posts">posts</NavbarItem>
        </div>
        <div className="right-side flex space-x-4 items-center">
          <DarkModeSelector />
        </div>
      </nav>
      <hr className="mt-1 border-b-gray-400-300" />
    </>
  );
}
function NavbarItem({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="text-gray-500 hover:text-black transition-colors duration-200 dark:text-gray-600 dark:hover:text-white"
    >
      {children}
    </Link>
  );
}
