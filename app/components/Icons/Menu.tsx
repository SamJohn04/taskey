'use client';

import { StyleContext } from "@/app/StyleContext";
import { useContext } from "react";

export default function Menu() {
    const [theme, ] = useContext(StyleContext);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{fill: theme?.colors?.text}} viewBox="0 -960 960 960" className="w-4 md:w-6"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
    )
}