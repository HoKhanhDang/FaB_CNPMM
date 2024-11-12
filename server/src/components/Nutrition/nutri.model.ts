import mongoose, { Document, Schema } from 'mongoose';

// Định nghĩa interface cho Nutritional Info
interface INutritionalInfo extends Document {
    item_id?: Schema.Types.ObjectId; // Sử dụng optional nếu có thể là null
    calories?: number;
    carbs?: number;
    proteins?: number;
    fats?: number;
}

// Định nghĩa schema cho Nutritional Info
const NutritionalInfoSchema: Schema = new Schema({
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem', // Đảm bảo rằng MenuItem là model đúng
        default: null
    },
    calories: {
        type: Number,
        default: null
    },
    carbs: {
        type: Number,
        default: null
    },
    proteins: {
        type: Number,
        default: null
    },
    fats: {
        type: Number,
        default: null
    }
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

// Tạo model từ schema
const NutritionalInfo = mongoose.model<INutritionalInfo>('NutritionalInfo', NutritionalInfoSchema);

export { NutritionalInfo, INutritionalInfo };