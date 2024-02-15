'use client';

import { StyleContext } from "@/app/StyleContext";
import { useContext } from "react";

export default function MoreVert({ isOpen }: { isOpen?: boolean }) {
    const [theme, ] = useContext(StyleContext);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={`w-4 md:w-6 transition ${isOpen ? 'rotate-180' : ''}`} style={{fill: theme?.colors?.textEmphasis}}><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
    )
}