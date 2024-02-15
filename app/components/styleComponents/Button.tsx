'use client';

import { StyleContext } from "@/app/StyleContext";
import React, { useContext } from "react";

export default function Button({ children, className, type, variant, style, isActive, disabled, onClick, noPad }: {
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "tertiary" | 'tertiary-active' | 'basic';
    style?: React.CSSProperties;
    isActive?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    noPad?: boolean
}) {
    const [isHover, setHover] = React.useState(false);
    const [theme, ] = useContext(StyleContext);
    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            background: theme?.colors?.primary,
            color: theme?.colors?.text,
        }, secondary: {
            background: theme?.colors?.secondary,
            color: theme?.colors?.text,
        }, tertiary: {
            color: isActive || isHover ? theme?.colors?.text : theme?.colors?.textMuted,
        }, "tertiary-active": {
            color: theme?.colors?.textEmphasis,
            opacity: isActive || isHover ? 1 : 0.8,
        }, basic:{
            background: `${theme?.colors?.neutral}${theme?.transparency?.box ?? 'A5'}`,
            color: theme?.colors?.text
        }
    }
    return (
        <button type={type ?? 'button'} disabled={disabled} className={`flex items-center ${!noPad && 'px-4 py-2'} ${variant === 'primary' || variant === 'secondary' ? 'rounded-md shadow-md' : ""} transition ${className ?? ''}`} style={{...variantStyles[variant ?? "primary"], ...style}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick}>
            {children}
        </button>
    )
}