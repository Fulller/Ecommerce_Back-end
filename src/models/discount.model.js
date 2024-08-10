import { Schema, SchemaTypes, model } from "mongoose";

import {
  DISCOUNT_SCHEMA_CONST,
  SHOP_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { COLLECTION_NAME, DOCUMENT_NAME, APPLY_TO, TYPE } =
  DISCOUNT_SCHEMA_CONST;

const discountSchema = new Schema(
  {
    discount_name: { type: SchemaTypes.String, require: true },
    discount_description: { type: SchemaTypes.String, require: true },
    discount_type: {
      type: SchemaTypes.String,
      default: TYPE.FIXED_AMOUNT,
      enum: Object.values(TYPE),
    },
    discount_value: { type: SchemaTypes.Number, require: true },
    discount_code: { type: SchemaTypes.String, require: true },
    discount_start_date: { type: SchemaTypes.Date, require: true },
    discount_end_date: { type: SchemaTypes.Date, require: true },
    discount_max_uses: { type: SchemaTypes.Number, require: true },
    discount_uses_count: { type: SchemaTypes.Number, default: [] },
    discount_users_used: { type: SchemaTypes.Array, default: [] },
    discount_min_order_value: { type: SchemaTypes.Number, require: true },
    discount_shopId: {
      type: SchemaTypes.ObjectId,
      ref: SHOP_SCHEMA_CONST.DOCUMENT_NAME,
    },
    discount_is_active: { type: SchemaTypes.Boolean, default: true },
    discount_applies_to: {
      type: SchemaTypes.String,
      enum: Object.values(APPLY_TO),
      default: APPLY_TO.ALL,
    },
    discount_product_ids: { type: SchemaTypes.Array, default: [] },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, discountSchema);
