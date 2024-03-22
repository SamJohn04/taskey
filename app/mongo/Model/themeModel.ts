import { Schema, model, models } from "mongoose";

export type Theme = {
    uId?: string;
    _id?: string;
    colors: {
        background: string;
        primary: string;
        secondary: string;
        text: string;
        textMuted: string;
        textEmphasis: string;
        neutral: string;
        danger: string;
        success: string;
        warning: string;
    }, background?: {
        body?: string;
        button?: string;
    }, transparency?: {
        box?: string;
        input?: string;
    }
}

export const themeSchema = new Schema({
    uId: {
        type: String,
        required: true
    },
    colors: {
        type: {
            primary: String,
            secondary: String,
            neutral: String,
            text: String,
            textEmphasis: String,
            textMuted: String,
            danger: String,
            success: String,
            warning: String,
            background: String,
        },
        required: true
    },
    transparency: {
        input: String,
        box: String
    },
    background: {
        body: String,
        button: String
    },
}, {
    timestamps: true
})

const themeModel = models.Theme || model('Theme', themeSchema);
export default themeModel;