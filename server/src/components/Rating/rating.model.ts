import mongoose, { Document, Schema } from "mongoose";

// Define TypeScript interface for a Rating document
interface IRating extends Document {
    item_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    order_id: Schema.Types.ObjectId;
    rating: number;
    comment?: string;
    created_at?: Date;
    updated_at?: Date;
    isRating?: boolean;
}

// Define the Mongoose schema for the Rating model
const RatingSchema: Schema<IRating> = new Schema({
    item_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    order_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Order",
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    isRating: {
        type: Boolean,
        default: false,
    },
});

// Middleware to update `updated_at` timestamp
RatingSchema.pre<IRating>("save", function (next) {
    this.updated_at = new Date();
    next();
});

// Create and export the model
const Rating = mongoose.model<IRating>("Rating", RatingSchema);
export default Rating;
