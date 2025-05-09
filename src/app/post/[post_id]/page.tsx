import pb from "@/lib/pocketbase";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import parse, { DOMNode } from "html-react-parser";
import { Element as DomElement } from "domhandler";
interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}
interface Props {
  params: Promise<{
    post_id: string;
  }>;
}
async function getPostData(post_id: string): Promise<Post | null> {
  try {
    const post = await pb.collection("posts").getOne<Post>(post_id);
    return post;
  } catch (error: unknown) {
    if (error instanceof Error && error instanceof Response) {
      if (error.status == 404) return null;
      throw error;
    } else {
      console.error("Unkown error", error);
      return null;
    }
  }
}
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
function extractLanguage(className = "") {
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : undefined;
}
function isDomElement(node: DOMNode): node is DomElement {
  return node.type === "tag";
}

export default async function page({ params }: Props) {
  const { post_id } = await params;

  const post = await getPostData(post_id);
  if (post === null) {
    notFound();
  }
  return (
    <main className="p-2 flex flex-col w-1/2 self-center">
      <h1 className="text-4xl font-bold my-5 mx-1">{post.title}</h1>
      <DateDisplay dateStr={post.created_at} />
      <hr />
      <article className="prose max-w-none ">
        <ContentDisplay html={post.content} />
      </article>
    </main>
  );
}
const DateDisplay = ({ dateStr }: { dateStr: string }) => (
  <p className="flex">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 mx-2 mb-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
      />
    </svg>
    {formatDate(dateStr)}
  </p>
);
const ContentDisplay = ({ html }: { html: string }) => {
  const cleanHtml = DOMPurify.sanitize(html);
  return (
    <div>
      {parse(cleanHtml, {
        replace: (domNode: DOMNode) => {
          if (
            isDomElement(domNode) &&
            domNode.name === "pre" &&
            domNode.children &&
            // @ts-expect-error It works, don't touch it
            isDomElement(domNode.children[0]) &&
            domNode.children[0].name === "code"
          ) {
            const className = domNode.attribs?.class || "";
            const language = extractLanguage(className);
            const codeContent = domNode.children[0].children
              ?.map((child) => ("data" in child ? child.data : ""))
              .join("");

            return (
              <SyntaxHighlighter language={language} style={oneDark}>
                {codeContent}
              </SyntaxHighlighter>
            );
          }
        },
      })}
    </div>
  );
};
