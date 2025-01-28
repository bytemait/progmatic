import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  gitHubUsername: string;
  accessToken: string;
  profilePhoto: string;
  role: string;
  contests: number;
  myContests: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    gitHubUsername: {
      type: String,
      unique: true,
      required: true,
    },
    accessToken: {
      type: String,
      unique: true,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["participant", "admin"],
      default: "participant",
    },
    contests: {
      type: Number,
      default: 0,
    },
    myContests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest',
      default: [],
    }],
  },

  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
