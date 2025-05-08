import ProfilePic from "@/ui/components/ProfilePic";

export default function Page() {
    return (
        <main className="flex flex-col items-center w-1/2 justify-self-center">
            <h1 className="text-5xl font-bold my-3 self-start">About me</h1>
            <hr />
            <div className="flex items-center w-full ">
                <ProfilePic />
                <div className="text-2xl flex-2/3">
                    Hi, I&apos;m welon and I&apos;m from Taichung, Taiwan, and also a
                    student studying at mingdao high school I&apos;m interested in
                    programming and solving math problems, and I hope to use my
                    coding skills to make life  easier
                </div>
            </div>
        </main>
    );
}
