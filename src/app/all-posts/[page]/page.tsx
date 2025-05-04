import pb from "@/lib/pocketbase";
import { notFound } from "next/navigation";
import { RecordModel } from "pocketbase";
import Link from "next/link";
import clsx from "clsx";
import Post from "@/ui/components/Post";
import {NextPageBtn, PageBtn, PrevPageBtn} from "@/ui/components/PageButtons";
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
  const { page } = await params;

  // 將 params.page 轉換為整數
  const pageNum = parseInt(page, 10);
  if (isNaN(pageNum) || pageNum < 1) notFound();
  const { posts, total } = await getPosts(pageNum);
  const totalPages = Math.ceil(total / perPage);

  if (pageNum > totalPages) notFound();
  return (
    <main className="flex flex-col items-center w-1/3 justify-self-center">
      <h1 className="text-5xl font-bold my-5">All Blog Posts</h1>
      <hr />
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
        {pageNum > 1  && (
          <PrevPageBtn pageNum={pageNum}/>
        )}
        {Array.from({ length: totalPages }, (_, i) => {
          const idx = i + 1;
          return (
            <PageBtn idx={idx} pageNum={pageNum} key={idx}/>
          );
        })}
        {pageNum < totalPages && (
          <NextPageBtn pageNum={pageNum}/>
        )}
      </div>
    </main>
  );
}
