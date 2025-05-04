import pb from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";
import Post from "./components/Post";
async function getRecentPosts(): Promise<RecordModel[]> {
    const result = await pb.collection("posts").getList(1, 3);
    return  result.items ;
}

export default async function RecentPosts() {
    const posts = await getRecentPosts();
    return (
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
    );
}
