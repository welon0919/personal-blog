import Link from "next/link";
import clsx from "clsx";
export  function NextPageBtn({pageNum}){
    return (
        <div className="flex items-center justify-center border dark:border-white rounded-sm border-slate-500 hover:cursor-pointer dark:hover:bg-slate-600 hover:bg-slate-200 transition duration-200 aspect-square">
            <Link href={`/all-posts/${pageNum + 1}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                </svg>
            </Link>
        </div>
    );
}
export function PrevPageBtn({ pageNum }) {
    return (
        <div className="flex items-center justify-center border dark:border-white rounded-sm border-slate-500 hover:cursor-pointer dark:hover:bg-slate-600 hover:bg-slate-200 transition duration-200 aspect-square">
            <Link href={`/all-posts/${pageNum - 1}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </Link>
        </div>
    );
}
export function PageBtn({idx, pageNum}){
    return (
        <div
            key={idx}
            className={clsx(
                "text-2xl border-slate-500 dark:border-white border rounded-sm w-7 aspect-square text-center hover:cursor-pointer transition duration-200 ",
                idx === pageNum && "dark:bg-slate-700 bg-slate-100 ",
                idx !== pageNum && "dark:hover:bg-slate-600 hover:bg-slate-200"
            )}
        >
            <Link href={`/all-posts/${idx}`}>{idx}</Link>
        </div>
    );
}
