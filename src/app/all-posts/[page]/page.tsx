import pb from "@/lib/pocketbase";
import { notFound } from "next/navigation";
import { RecordModel } from "pocketbase";
import Link from "next/link";
import clsx from "clsx";
interface Props {
  params: { page: string };
}

const perPage = 10;
async function getPosts(
  page: number
): Promise<{ posts: RecordModel[]; total: number }> {
  const res = await pb.collection("posts").getList(page, perPage, {
    sort: "-created",
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
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <div className="flex gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => {
          const idx = i + 1;
          return (
            <div
              key={idx}
              className={clsx(
                "text-2xl border-white border rounded-sm aspect-square text-center hover:cursor-pointer transition duration-50",
                idx === pageNum && "bg-slate-700",
                idx !== pageNum && "hover:bg-slate-800 "
              )}
            >
              <Link href={`/all-posts/${idx}`}>{idx}</Link>
            </div>
          );
        })}
        {pageNum < totalPages && (
          <div className="">
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
