import mongoose, { Document, Schema, Model } from "mongoose";

// Define TypeScript interface for a Layout document
export interface ILayout extends Document {
    name: string;
    page: string;
    prompt?: string;
    code?: string;
    create_at?: Date;
}

// Define the Mongoose schema
const LayoutSchema: Schema<ILayout> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    page: {
        type: String,
        required: true,
        trim: true,
    },
    prompt: {
        type: String,
    },
    code: {
        type: String,
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
});

// Define and export the model with the interface
const Layout: Model<ILayout> = mongoose.model<ILayout>("Layout", LayoutSchema);
export default Layout;
