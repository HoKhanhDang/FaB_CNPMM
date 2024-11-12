import mongoose, { Document, Schema } from "mongoose";

// Định nghĩa interface cho View, kế thừa từ Document
interface IView extends Document {
  create_at: Date;
}

// Định nghĩa schema cho View
const viewSchema: Schema<IView> = new Schema(
  {
    create_at: {
      type: Date,
      default: Date.now, // Mặc định là thời gian hiện tại
      required: true,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Tạo model từ schema
const View = mongoose.model<IView>("View", viewSchema);

export default View;
