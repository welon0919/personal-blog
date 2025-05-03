"use client";
export default function ErrorPage() {
    return (
        <main className="flex items-center h-lvh justify-center flex-col">
            <h1 className="text-5xl">something went wrong...</h1>
            <h1 className="text-2xl">refreshing the page might help</h1>
            <button
                className="text-2xl
                 bg-gray-200
                 dark:bg-gray-800
                   rounded-2xl p-2 border-2
                 border-black cursor-pointer 
                 hover:bg-gray-100
                 dark:hover:bg-gray-700
                   transition duration-150"
                onClick={() => location.reload()}
            >
               Reload
            </button>
        </main>
    );
}
