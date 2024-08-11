import { Schema, SchemaTypes, model } from "mongoose";
import { SKU_SCHEMA_CONST } from "../configs/schema.const.config.js";

const { DOCUMENT_NAME, COLLECTION_NAME } = SKU_SCHEMA_CONST;
const SKUSchema = new Schema(
  {
    sku_spu: { type: SchemaTypes.ObjectId, required: true },
    sku_tier_idx: { type: [SchemaTypes.Number], default: [0] },
    sku_default: { type: SchemaTypes.Boolean, default: false },
    sku_slug: { type: SchemaTypes.String, required: true, unique: true },
    sku_price: { type: SchemaTypes.Number, required: true },
    sku_stock: { type: SchemaTypes.Number, required: true },
    sku_image: { type: SchemaTypes.String, required: true },
    sku_weight: { type: SchemaTypes.Number },
    sku_sold: { type: SchemaTypes.Number, default: 0 },
    isPublished: {
      type: SchemaTypes.Boolean,
      index: true,
      default: false,
      select: false,
    },
    isDraft: {
      type: SchemaTypes.Boolean,
      index: true,
      default: true,
      select: false,
    },
    isDeleted: { type: SchemaTypes.Boolean, default: false },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

export default model(DOCUMENT_NAME, SKUSchema);
