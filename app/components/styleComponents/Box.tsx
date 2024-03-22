'use client';

import { StyleContext } from "@/app/StyleContext";
import React, { useContext } from "react";

export default function Box({ children, className, variant, style, id, onClick }: {
    children?: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "tertiary";
    style?: React.CSSProperties;
    id?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
    const [theme, ] = useContext(StyleContext);
    const transparency = theme?.transparency?.box ?? 'A5'
    const variantStyles = {
        primary: {
            background: `${theme?.colors?.primary}${transparency.length === 1 ? '0' + transparency : transparency}`,
            color: theme?.colors?.text
        },
        secondary: {
            background: `${theme?.colors?.secondary}${transparency.length === 1 ? '0' + transparency : transparency}`,
            color: theme?.colors?.text
        },
        tertiary: {
            background: `${theme?.colors?.background}${transparency.length === 1 ? '0' + transparency : transparency}`,
            color: theme?.colors?.text
        }, basic:{
            background: `${theme?.colors?.neutral}${transparency.length === 1 ? '0' + transparency : transparency}`,
            color: theme?.colors?.text
        } 
    }


    return (
        <div className={`${className} backdrop-blur`} style={{...variantStyles[variant ?? 'basic'], ...style}} id={id} onClick={onClick}>
            {children}
        </div>
    )
}