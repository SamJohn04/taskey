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
    const variantStyles = {
        primary: {
            background: `${theme?.colors?.primary}${theme?.transparency?.box ?? 'A5'}`,
            color: theme?.colors?.text
        },
        secondary: {
            background: `${theme?.colors?.secondary}${theme?.transparency?.box ?? 'A5'}`,
            color: theme?.colors?.text
        },
        tertiary: {
            background: `${theme?.colors?.background}${theme?.transparency?.box ?? 'A5'}`,
            color: theme?.colors?.text
        }, basic:{
            background: `${theme?.colors?.neutral}${theme?.transparency?.box ?? 'A5'}`,
            color: theme?.colors?.text
        } 
    }


    return (
        <div className={`${className} backdrop-blur`} style={{...variantStyles[variant ?? 'basic'], ...style}} id={id} onClick={onClick}>
            {children}
        </div>
    )
}