import pb from "@/lib/pocketbase";
interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}
async function getPostData(post_id: string): Promise<Post> {
  const post = await pb.collection("posts").getOne<Post>(post_id);
  return post;
}

export default async function page({
  params,
}: {
  params: { post_id: string };
}) {
  const post = await getPostData(params.post_id);
  return (
    <main>
      <h1>{post.title}</h1>
    </main>
  );
}
