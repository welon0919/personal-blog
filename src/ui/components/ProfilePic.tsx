"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePic(){
    const [mounted, setMounted] = useState(false)
    const {theme, resolvedTheme} = useTheme()
    useEffect(() => {
        setMounted(true)
    }, []);
    if(!mounted) return null
    const currentTheme  = theme === 'system' ? resolvedTheme : theme
    
    return (
        <Image
        src={currentTheme === 'dark' ? '/pfp_dark.svg' : 'pfp_light.svg'}
        alt="my profile pic"
        width={300}
        height={300}
        />
    )
}
