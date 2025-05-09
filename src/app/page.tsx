import Link from "next/link";
import RecentPosts from "@/ui/RecentPosts";
import { FaGithub } from "react-icons/fa6";
export default function Home() {
    return (
        <main className="flex  flex-col text-center mt-20 items-center">
            <h1 className="text-7xl font-bold mb-10">Hello I'm Welon</h1>
            <p className="opacity-70 text-2xl">Welcome to my blog</p>
            <div className="py-20 px-4 rounded-2xl border border-black dark:border-white">
                <h1 className="text-4xl">Recent Posts</h1>
                <RecentPosts />
            </div>
            <Link href="/all-posts">
                <button className="border border-white rounded-2xl p-2 bg-">
                    View All Blog Posts
                </button>
            </Link>
        </main>
    );
}
