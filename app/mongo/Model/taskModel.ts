import { Schema, model, models } from "mongoose";

export const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, status: {
        type: String,
        enum: ['waiting', 'ongoing', 'completed', 'dropped'],
        required: true,
        default: 'waiting'
    }, dueAt: Date,
    completedAt: Date,
    important: {
        type: Boolean,
        default: false
    }, uId: {
        type: String,
        required: true
    }, tags: [String],
    repeating: {
        type: String,
        enum: ['instantly', 'daily', 'weekly', 'monthly', 'yearly']
    }
}, {
    timestamps: true,
})

export type Task = {
    title: string,
    description: string,
    status?: 'waiting' | 'ongoing' | 'completed' | 'dropped',
    dueAt?: Date,
    completedAt?: Date,
    important?: boolean,
    uId: string,
    tags?: string[],
    repeating?: 'instantly' | 'daily' | 'weekly' | 'monthly' | 'yearly',
    _id?: string,
    createdAt?: Date,
}

const taskModel = models.Task || model('Task', taskSchema);
export default taskModel;