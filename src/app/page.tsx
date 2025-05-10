import Link from "next/link";
import RecentPosts from "@/ui/RecentPosts";
export default function Home() {
    return (
        <main className="flex  flex-col text-center mt-20 items-center">
            <h1 className="text-7xl font-bold mb-10">Hello I&apos;m Welon</h1>
            <p className="opacity-70 text-2xl">Welcome to my blog</p>
            <div className="mt-7">
                <h1 className="text-4xl">Recent Posts</h1>
                <hr />
                <RecentPosts />
            </div>
            <Link href="/all-posts">
                <button className="border  border-black dark:border-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl p-2 cursor-pointer">
                    View All Blog Posts
                </button>
            </Link>
        </main>
    );
}
