'use client';

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Theme } from "./mongo/Model/themeModel";

export const themes: Record<string, Theme> = {
    lightBlue: {
        colors : {
            background: "#C1C8E4",
            primary: "#5680E9",
            secondary: "#59EBCB",
            text: "#000000",
            textMuted: "#64748B",
            textEmphasis: "#235be8",
            neutral: "#F5F5F5",
            success: "#2FAD79",
        }, transparency: {
            box: "65",
            input: '33'
        }
    }, darkPurple: {
        colors : {
            background: "#150312",
            primary: "#8530d1",
            secondary: "#A38401",
            text: "#FFFFFF",
            textMuted: "#a9bad1",
            textEmphasis: "#ca69f0",
            neutral: "#2C0735"
        }
    }
}

export const StyleContext = createContext<[Theme | null, Dispatch<SetStateAction<Theme | null>> | null]>([null, null]);

export default function StyleProvider({ children, themeName, theme } : { children: React.ReactNode | React.ReactNode[], themeName?: keyof typeof themes, theme?: Theme }) {
    const [currentTheme, setTheme] = useState<Theme | null>(theme ?? themes[themeName ?? 'lightBlue']);
    return (
        <StyleContext.Provider value={[currentTheme, setTheme]}>
            {children}
        </StyleContext.Provider>
    )
}