import { Schema, model } from "mongoose";

const userActivitySchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    action: { type: String, required: true, index: true },
    entityType: { type: String, required: true },
    entityId: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);

export const UserActivityModel = model("UserActivity", userActivitySchema);