import { Schema, SchemaTypes, model } from "mongoose";

import {
  SPU_SCHEMA_CONST,
  SKU_SCHEMA_CONST,
  SHOP_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { DOCUMENT_NAME, COLLECTION_NAME } = SPU_SCHEMA_CONST;

const SPUSchema = new Schema(
  {
    spu_slug: { type: SchemaTypes.String, required: true, unique: true },
    spu_name: { type: SchemaTypes.String, required: true },
    spu_description: { type: SchemaTypes.String, required: true },
    spu_category: { type: [SchemaTypes.String], required: true },
    spu_brand: { type: SchemaTypes.String, required: true },
    spu_images: { type: [SchemaTypes.String], required: true },
    spu_shop: {
      type: SchemaTypes.ObjectId,
      ref: SHOP_SCHEMA_CONST.DOCUMENT_NAME,
      required: true,
    },
    spu_variations: [
      {
        name: SchemaTypes.String,
        images: [SchemaTypes.String],
        options: [SchemaTypes.String],
      },
    ],
    spu_skus: [
      {
        type: SchemaTypes.ObjectId,
        ref: SKU_SCHEMA_CONST.DOCUMENT_NAME,
        default: [],
      },
    ],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

export default model(DOCUMENT_NAME, SPUSchema);
