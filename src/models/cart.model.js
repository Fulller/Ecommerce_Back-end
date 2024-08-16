import { Schema, SchemaTypes, model } from "mongoose";

import {
  CART_SCHEMA_CONST,
  USER_SCHEMA_CONST,
  SKU_SCHEMA_CONST,
} from "../configs/schema.const.config.js";
const { DOCUMENT_NAME, COLLECTION_NAME, STATE } = CART_SCHEMA_CONST;

const CartItemSchema = new Schema(
  {
    sku: {
      type: Schema.Types.ObjectId,
      ref: SKU_SCHEMA_CONST.DOCUMENT_NAME,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

const CartSchema = new Schema(
  {
    cart_user: {
      type: SchemaTypes.ObjectId,
      ref: USER_SCHEMA_CONST.DOCUMENT_NAME,
      required: true,
      index: true,
    },
    cart_state: {
      type: SchemaTypes.String,
      enum: Object.values(STATE),
      default: STATE.ACTIVE,
    },
    cart_items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

export default model(DOCUMENT_NAME, CartSchema);
