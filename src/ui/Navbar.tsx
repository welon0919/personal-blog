import Link from "next/link";
import { ReactNode } from "react";
export default function Navbar() {
    return (
        <>
            <nav className="p-2 text-2xl">
                <div className="left-side flex space-x-4 items-center">
                    <Link href="/" className="font-bold mr-8">
                        Welon Blog
                    </Link>

                    <NavbarItem href="about">
                        about
                        </NavbarItem>

                    <Link
                        href="/posts"
                        className="text-gray-500 hover:text-gray-950"
                    >
                        posts
                    </Link>
                </div>
            </nav>
            <hr className="mt-1 border-b-gray-400-300" />
        </>
    );
}
function NavbarItem({ children , href}:{ children:ReactNode, href:string}) {
    return(
        <Link href={href} className="text-gray-500 hover:text-black transition-colors duration-200">
        {children}
        </Link>
    )
}
