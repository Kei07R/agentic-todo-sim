import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    id: { type: String, required: true},
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
    date: { type: Date, required: true },
    creattedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    tasks: [TaskSchema]
});

export default mongoose.models.User || mongoose.model("User", UserSchema);