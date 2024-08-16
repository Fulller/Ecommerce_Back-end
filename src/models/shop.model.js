import { Schema, SchemaTypes, model } from "mongoose";
import {
  SHOP_SCHEMA_CONST,
  USER_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { DOCUMENT_NAME, COLLECTION_NAME, STATUS } = SHOP_SCHEMA_CONST;

const ShopSchema = new Schema(
  {
    shop_name: {
      type: SchemaTypes.String,
      trim: true,
      maxLength: 150,
    },
    shop_address: {
      type: SchemaTypes.String,
      trim: true,
      maxLength: 150,
    },
    shop_status: {
      type: SchemaTypes.String,
      enum: Object.values(STATUS),
      default: STATUS.INACTIVE,
    },
    shop_verify: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    shop_owner: {
      type: Schema.ObjectId,
      ref: USER_SCHEMA_CONST.DOCUMENT_NAME,
      require: true,
    },
    shop_is_mall: { type: SchemaTypes.Boolean, default: false },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
ShopSchema.index({ shop_owner: 1 });
export default model(DOCUMENT_NAME, ShopSchema);
