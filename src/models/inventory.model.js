import { Schema, SchemaTypes, model } from "mongoose";

import {
  INVENTORY_SCHEMA_CONST,
  SKU_SCHEMA_CONST,
  CART_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { COLLECTION_NAME, DOCUMENT_NAME } = INVENTORY_SCHEMA_CONST;

const InventorySchema = new Schema(
  {
    inven_sku: {
      type: SchemaTypes.ObjectId,
      ref: SKU_SCHEMA_CONST.DOCUMENT_NAME,
    },
    inven_stock: { type: SchemaTypes.Number, require: true },
    inven_location: { type: SchemaTypes.String, default: "unknow" },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, InventorySchema);
