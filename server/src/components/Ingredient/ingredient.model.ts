import mongoose, { Schema, Document } from "mongoose";

// Định nghĩa interface cho Ingredient
interface IIngredient extends Document {
  ingredient_id: Schema.Types.ObjectId;
  name: string | null;
  stock: number | null;
  unit: string | null;
  is_available: boolean;
}

// Định nghĩa schema cho Ingredient
const IngredientSchema: Schema = new Schema<IIngredient>(
  {
    ingredient_id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: String,
      default: null,
    },
    stock: {
      type: Number,
      default: null,
    },
    unit: {
      type: String,
      default: null,
    },
    is_available: {
      type: Boolean,
      default: true, // Tương đương với tinyint(1) DEFAULT '1'
    },
  },
  {
    timestamps: true, // Thêm createdAt và updatedAt tự động
  }
);

// Tạo model từ schema
const Ingredient = mongoose.model<IIngredient>("Ingredient", IngredientSchema);

export { Ingredient, IIngredient };
