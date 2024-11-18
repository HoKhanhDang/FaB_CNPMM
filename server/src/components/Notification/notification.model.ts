import mongoose, { Schema, Document } from 'mongoose';

// Định nghĩa kiểu cho Notification
interface INotification extends Document {
    nof_id: string;
    title?: string;
    content?: string;
    isRead?: boolean;
    isDeleted?: boolean;
    user_id?: string;
    type?: 'new' | 'done' | 'repaired' | 'ingredient' | 'failed';
    time?: Date;
    link?: string;
}

// Tạo schema cho Notification
const NotificationSchema: Schema = new Schema({
    nof_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        autoIncrement: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'User',
    },
    title: {
        type: String,
        default: null,
    },
    content: {
        type: String,
        default: null,
    },
    isRead: {
        type: Boolean,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ['new', 'done', 'repaired', 'ingredient', 'failed'],
        default: null,
    },
    time: {
        type: Date,
        default: null,
    },
    link: {
        type: String,
        maxlength: 100,
        default: null,
    },
});

// Tạo model Notification
const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export { Notification, INotification };