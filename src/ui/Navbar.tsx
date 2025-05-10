import Link from "next/link";
import { ReactNode } from "react";
import DarkModeSelector from "./components/DarkModeSelector";
import { GrFlagFill } from "react-icons/gr";
import { DiGithubFull } from "react-icons/di";
import { FaGithub } from "react-icons/fa";
export default function Navbar() {
    return (
        <>
            <nav className="p-2 px-4 text-2xl flex justify-between">
                <div className="left-side flex space-x-4 items-center">
                    <Link href="/" className="font-bold mr-8">
                        Welon Blog
                    </Link>

                    <NavbarItem href="/about">about</NavbarItem>

                    <NavbarItem href="/all-posts">posts</NavbarItem>
                </div>
                <div className="right-side flex space-x-4 items-center">
                    <Link
                        href="https://github.com/welon0919/personal-blog/issues/new"
                        target="_blank"
                    >
                        <button
                            className="dark:text-white text-black dark:hover:bg-slate-700 hover:bg-slate-400 p-2  transition duration-100 cursor-pointer flex items-center"
                            title="report an issue"
                        >
                            <GrFlagFill size={20} />
                        </button>
                    </Link>
                    <Link
                        href="https://github.com/welon0919"
                        target="_blank"
                    >
                        <button
                            className="dark:text-white text-black dark:hover:bg-slate-700 hover:bg-slate-400 p-2  transition duration-100 cursor-pointer flex items-center"
                            title="My Github"
                        >
                            <FaGithub/>
                        </button>
                    </Link>
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
            className="
        text-gray-500
        transition-colors duration-200
        dark:hover:text-gray-50
        hover:text-black 
        dark:text-gray-600
      "
        >
            {children}
        </Link>
    );
}
