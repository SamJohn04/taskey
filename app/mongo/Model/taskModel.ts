import { Schema, model, models } from "mongoose";

export const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    }, description: {
        type: String,
        default: ""
    }, status: {
        type: String,
        enum: ['in progress', 'completed', 'dropped'],
        required: true,
        default: 'in progress'
    }, dueAt: Date,
    completedAt: Date,
    important: {
        type: Boolean,
        default: false
    }, uId: {
        type: String,
        required: true
    }, tags: [String],
    repeating: Boolean,
    originalId: String
}, {
    timestamps: true,
})

export type Task = {
    title: string,
    description: string,
    status?: 'in progress' | 'completed' | 'dropped',
    dueAt?: Date,
    completedAt?: Date,
    important?: boolean,
    uId: string,
    tags?: string[],
    repeating?: boolean,
    _id?: string,
    createdAt?: Date,
    originalId?: string
}

const taskModel = models.Task || model('Task', taskSchema);
export default taskModel;