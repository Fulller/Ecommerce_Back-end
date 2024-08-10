import { Schema, SchemaTypes, model } from "mongoose";

import { ORDER_SCHEMA_CONST } from "../configs/schema.const.config.js";
const { DOCUMENT_NAME, COLLECTION_NAME, STATUS } = ORDER_SCHEMA_CONST;

const orderSchema = new Schema(
  {
    order_userId: { type: SchemaTypes.Number, required: true },
    order_checkout: { type: Object, default: {} },
    // { totalPrice, totalApplyDiscount, feeShip }
    order_shipping: { type: Object, default: {} },
    // {street, city, state, country}
    order_payment: { type: Object, default: {} },
    order_products: { type: SchemaTypes.Array, require: true },
    order_trackingNumer: {
      type: SchemaTypes.String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
export default model(DOCUMENT_NAME, orderSchema);
