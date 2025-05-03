"use client";
import Link from "next/link";
export default function Page() {
    return (
        <main className="flex h-lvh justify-center items-center flex-col">
            <h1 className="text-center text-5xl mb-3">{`:(`}</h1>
            <h1 className="text-center text-5xl">post not found</h1>
            <Link href="/" className="mt-3">
                <button
                    className="text-2xl
                 bg-gray-200
                 dark:bg-gray-800
                   rounded-2xl p-2 border-2
                 border-black cursor-pointer 
                 hover:bg-gray-100
                 dark:hover:bg-gray-700
                   transition duration-150"
                >
                    Go Back To Home
                </button>
            </Link>
        </main>
    );
}
