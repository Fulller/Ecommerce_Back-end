import { Schema, SchemaTypes, model } from "mongoose";
import { OTP_SCHEMA_CONST } from "../configs/schema.const.config.js";
const { DOCUMENT_NAME, COLLECTION_NAME, STATUS } = OTP_SCHEMA_CONST;
const otpSchema = new Schema(
  {
    otp_token: { type: SchemaTypes.String, required: true },
    otp_email: { type: SchemaTypes.String, required: true },
    otp_status: {
      type: SchemaTypes.String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
    expireAt: { type: Date, default: Date.now, expires: 60 },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, otpSchema);
