import { Schema, SchemaTypes, model } from "mongoose";

import {
  CART_SCHEMA_CONST,
  USER_SCHEMA_CONST,
} from "../configs/schema.const.config.js";
const { DOCUMENT_NAME, COLLECTION_NAME, STATE } = CART_SCHEMA_CONST;

const CartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sku: {
      type: Schema.Types.ObjectId,
      ref: "SKU",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const CartSchema = new Schema(
  {
    cart_user: {
      type: SchemaTypes.ObjectId,
      ref: USER_SCHEMA_CONST.DOCUMENT_NAMEs,
      required: true,
    },
    cart_state: {
      type: SchemaTypes.String,
      enum: Object.values(STATE),
      default: STATE.ACTIVE,
    },
    cart_products: {
      type: [CartItemSchema],
      default: [],
    },
    cart_count_products: { type: SchemaTypes.Number, default: 0 },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, CartSchema);
