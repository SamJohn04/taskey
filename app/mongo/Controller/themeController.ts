'use server';

import { getSession } from "@auth0/nextjs-auth0";
import themeModel, { Theme } from "../Model/themeModel";
import { connectDB } from "../database";

export async function createTheme(theme: Theme, themeName: string): Promise<{ success: true } | { success: false, error: unknown }> {
    const { user } = (await getSession()) ?? {};
    if (!user) {
        return {
            success: false,
            error: 'User not found'
        }
    }

    const { success, connection, error } = await connectDB();
    if (!success) {
        return {
            success: false,
            error: error
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

export async function getAllThemes():Promise<{ success: false, error: unknown } | { success: true, themes: Theme[] }> {
    const { user } = (await getSession()) ?? {};
    if (!user) {
        return {
            success: false,
            error: 'User not found'
        }
    }

    const { success, connection, error } = await connectDB();
    if (!success) {
        return {
            success: false,
            error: error
        }
    }

    try {
        let themes = await themeModel.find({uId: user.sub}).exec();
        themes = themes.map((theme) => ({
            name: theme.name,
            colors: {
                background: theme.colors.background,
                primary: theme.colors.primary,
                secondary: theme.colors.secondary,
                text: theme.colors.text,
                textMuted: theme.colors.textMuted,
                textEmphasis: theme.colors.textEmphasis,
                neutral: theme.colors.neutral,
                danger: theme.colors.danger,
                success: theme.colors.success,
                warning: theme.colors.warning
            },
            background: {
                body: theme.background.body,
                button: theme.background.button
            },
            transparency: {
                box: theme.transparency.box,
                input: theme.transparency.input
            },
            _id: theme._id.toString(),
        }))
        return {
            success: true,
            themes: themes
        }
    } catch(error) {
        console.log('Theme Get Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}

export async function getTheme():Promise<{ success: false, error: unknown } | { success: true, theme: Theme }> {
    const { user } = (await getSession()) ?? {};
    if (!user) {
        return {
            success: false,
            error: 'User not found'
        }
    }

    const { success, connection, error } = await connectDB();
    if (!success) {
        return {
            success: false,
            error: error
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

export async function deleteTheme(themeId: string):Promise<{ success: true } | { success: false, error: unknown }> {
    const { user } = (await getSession()) ?? {};
    if (!user) {
        return {
            success: false,
            error: 'User not found'
        }
    }

    const { success, connection, error } = await connectDB();
    if (!success) {
        return {
            success: false,
            error: error
        }
    } 

    try {
        await themeModel.deleteOne({_id: themeId, uId: user.sub}).exec();
        return {
            success: true,
        }
    } catch(error) {
        console.log('Theme Delete Error: ', error)
        return {
            success: false,
            error: error
        }
    }
}