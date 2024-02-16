'use server';

import { getSession } from "@auth0/nextjs-auth0";
import themeModel, { Theme } from "../Model/themeModel";
import { connectDB } from "../database";

export async function createTheme(theme: Theme, themeName: string): Promise<{ success: true } | { success: false, error: unknown }> {
    const { success, connection, error } = await connectDB();
    const { user } = (await getSession()) ?? {};
    if (!success) {
        return {
            success: false,
            error: error
        }
    } else if (!user) {
        return {
            success: false,
            error: 'User not found'
        }
    }
    try {
        await themeModel.updateOne({uId: user?.sub, name: themeName}, {...theme, uId: user?.sub, name: themeName}, {upsert: true}).exec();
        return {
            success: true,
        }
    } catch(error) {
        console.log('Default Theme Create Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}

export async function getTheme() {
    const { success, connection, error } = await connectDB();
    const { user } = (await getSession()) ?? {};
    if (!success) {
        return {
            success: false,
            error: error
        }
    } else if (!user) {
        return {
            success: false,
            error: 'User not found'
        }
    }
    try {
        const themeResult = await themeModel.findOne({uId: user.sub}, {}, {sort: {createdAt: -1}}).exec();
        const theme = {
            colors: {
                background: themeResult.colors.background,
                primary: themeResult.colors.primary,
                secondary: themeResult.colors.secondary,
                text: themeResult.colors.text,
                textMuted: themeResult.colors.textMuted,
                textEmphasis: themeResult.colors.textEmphasis,
                neutral: themeResult.colors.neutral,
                danger: themeResult.colors.danger,
                success: themeResult.colors.success,
                warning: themeResult.colors.warning
            },
            background: {
                body: themeResult.background.body,
                button: themeResult.background.button
            },
            transparency: {
                box: themeResult.transparency.box,
                input: themeResult.transparency.input
            }
        }
        return {
            success: true,
            theme: theme
        }
    } catch(error) {
        console.log('Theme Get Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}