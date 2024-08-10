import { Schema, SchemaTypes, model } from "mongoose";

import {
  NOTIFICATION_SCHEMA_CONST,
  SHOP_SCHEMA_CONST,
} from "../configs/schema.const.config.js";
const { DOCUMENT_NAME, COLLECTION_NAME, TYPE } = NOTIFICATION_SCHEMA_CONST;

const notificationSchema = new Schema(
  {
    noti_type: {
      type: SchemaTypes.String,
      enum: Object.values(TYPE),
      required: true,
    },
    noti_content: { type: SchemaTypes.String, required: true },
    noti_receivedId: { type: SchemaTypes.Number, required: true },
    noti_senderId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: SHOP_SCHEMA_CONST.DOCUMENT_NAME,
    },
    noti_options: { type: SchemaTypes.Object, default: {} },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, notificationSchema);
