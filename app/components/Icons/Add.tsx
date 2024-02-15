'use client';

import { StyleContext } from "@/app/StyleContext";
import { useContext } from "react";

export default function Add() {
    const [theme, ] = useContext(StyleContext);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{fill: theme?.colors?.text}} viewBox="0 -960 960 960" className="w-4 md:w-6"><path xmlns="http://www.w3.org/2000/svg" d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
    )
}