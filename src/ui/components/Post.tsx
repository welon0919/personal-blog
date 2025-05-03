import Link from "next/link";
export default function Post({
  post_id,
  title,
  created_at,
}: {
  post_id: string;
  title: string;
  created_at: string;
}) {
  console.log(created_at);
  return (
    <Link href={`/post/${post_id}`}>
      <div className="rounded-2xl text-3xl my-3.5 border py-3 px-5 w-3xl text-left flex flex-col  items-start hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-200 ">
        <h1 className="font-bold mt-0.5">{title}</h1>
        <p className="text-sm ">created at:{created_at.split(" ")[0]}</p>
      </div>
    </Link>
  );
}
