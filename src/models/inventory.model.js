import { Schema, SchemaTypes, model } from "mongoose";

import {
  INVENTORY_SCHEMA_CONST,
  PRODUCT_SCHEMA_CONST,
  SHOP_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { COLLECTION_NAME, DOCUMENT_NAME } = INVENTORY_SCHEMA_CONST;

const inventorySchema = new Schema(
  {
    inven_productId: {
      type: SchemaTypes.ObjectId,
      ref: PRODUCT_SCHEMA_CONST.DOCUMENT_NAME,
    },
    inven_shopId: {
      type: SchemaTypes.ObjectId,
      ref: SHOP_SCHEMA_CONST.DOCUMENT_NAME,
    },
    inven_stock: { type: SchemaTypes.Number, require: true },
    inven_location: { type: SchemaTypes.String, default: "unknow" },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, inventorySchema);
