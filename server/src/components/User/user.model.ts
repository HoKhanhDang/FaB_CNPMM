import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface IUser extends Document {
    user_id: Schema.Types.ObjectId;
    username: string;
    password: string;
    email: string;
    fullName: string;
    age?: number;
    about?: string;
    phone?: string;
    image: string;
    role: 'user' | 'admin' | 'cashier' | 'chef' | 'shipper';
    status: 'pending' | 'active' | 'off' | 'banned';
    point?: number;
    create_at?: Date;
    permissions?: Record<string, any>;
    refreshToken?: string;
}

const UserSchema: Schema = new Schema<IUser>({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        // To implement auto-increment, consider using a plugin like mongoose-sequence
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
          validator: function (v: string) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: (props: any) => `${props.value} không phải là email hợp lệ!`,
        },
      },
    fullName: {
        type: String,
        default: null,
        trim: true,
    },
    age: {
        type: Number,
        default: null,
    },
    about: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: null,
        trim: true,
    },
    image: {
        type: String,
        default: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'cashier', 'chef', 'shipper'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'off', 'banned'],
        default: 'pending',
    },
    point: {
        type: Number,
        default: 0,
    },
    permissions: {
        type: Schema.Types.Mixed,
        default: null,
    },
}, { timestamps: true });

// Optional: If you want to automatically set `create_at` to the current date when a user is created
UserSchema.pre<IUser>('save', function (next) {
    if (!this.create_at) {
        this.create_at = new Date();
    }
    next();
});

UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    if (!this.create_at) {
      this.create_at = new Date();
    }
    next();
  });

export default mongoose.model<IUser>('User', UserSchema);