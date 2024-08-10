import { Schema, SchemaTypes, model } from "mongoose";

import { CART_SCHEMA_CONST } from "../configs/schema.const.config.js";
const { DOCUMENT_NAME, COLLECTION_NAME, STATE } = CART_SCHEMA_CONST;

const cartSchema = new Schema(
  {
    cart_state: {
      type: SchemaTypes.String,
      enum: Object.values(STATE),
      default: STATE.ACTIVE,
    },
    cart_products: {
      type: [SchemaTypes.Mixed],
      default: [],
      required: true,
    },
    cart_count_products: { type: SchemaTypes.Number, default: 0 },
    cart_userId: { type: SchemaTypes.Number, required: true },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, cartSchema);
