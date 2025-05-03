import pb from "@/lib/pocketbase";
import { notFound } from "next/navigation";
import { RecordModel } from "pocketbase";
import Link from "next/link";
import clsx from "clsx";
import Post from "@/ui/components/Post";
interface Props {
  params: { page: string };
}

const perPage = 10;
async function getPosts(
  page: number
): Promise<{ posts: RecordModel[]; total: number }> {
  const res = await pb.collection("posts").getList(page, perPage, {
    sort: "-created_at",
  });
  return {
    posts: res.items,
    total: res.totalItems,
  };
}

export async function generateStaticParams() {
  const { total } = await getPosts(1);
  const totalPages = Math.ceil(total / perPage);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export default async function Page({ params }: Props) {
  const pageNum = parseInt(params.page, 10);
  if (isNaN(pageNum) || pageNum < 1) notFound();
  const { posts, total } = await getPosts(pageNum);
  const totalPages = Math.ceil(total / perPage);

  if (pageNum > totalPages) notFound();
  return (
    <main className="flex flex-col items-center ">
      <ul>
        {posts.map((post) => (
          <Post
            key={post.id}
            post_id={post.id}
            created_at={post.created_at}
            title={post.title}
          />
        ))}
      </ul>
      <div className="flex gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => {
          const idx = i + 1;
          return (
            <div
              key={idx}
              className={clsx(
                "text-2xl border-slate-500 dark:border-white border rounded-sm w-7 aspect-square text-center hover:cursor-pointer transition duration-200 ",
                idx === pageNum && "dark:bg-slate-700 bg-slate-400 ",
                idx !== pageNum && "dark:hover:bg-slate-800 hover:bg-slate-200"
              )}
            >
              <Link href={`/all-posts/${idx}`}>{idx}</Link>
            </div>
          );
        })}
        {pageNum < totalPages && (
          <div className="flex items-center">
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
        )}
      </div>
    </main>
  );
}
