'use client';

import { StyleContext } from "@/app/StyleContext";
import { useContext } from "react";

const defaultColors = {
    text: '#000',
    textMuted: '#676767',
    textEmphasis: '#000',
    danger: '#ff0000',
    success: '#00ff00',
    warning: '#ffcc00'

}

export default function Span({ children, variant = 'text', style, className } : {
    children: React.ReactNode | React.ReactNode[];
    variant?: "text" | "textMuted" | "textEmphasis" | 'danger' | 'success' | 'warning';
    style?: React.CSSProperties;
    className?: string;
}) {
    const [theme, ] = useContext(StyleContext);
    return (
        <span style={{color: (theme?.colors && theme.colors[variant]) ?? defaultColors[variant], ...style}} className={className}>{children}</span>
    )
}