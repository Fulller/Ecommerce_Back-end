import { Schema, SchemaTypes, model } from "mongoose";

import {
  SPU_SCHEMA_CONST,
  SKU_SCHEMA_CONST,
  SHOP_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { DOCUMENT_NAME, COLLECTION_NAME, IMAGE_RATIO, USAGE_STATUS } =
  SPU_SCHEMA_CONST;

const SPUSchema = new Schema(
  {
    spu_shop: {
      type: SchemaTypes.ObjectId,
      ref: SHOP_SCHEMA_CONST.DOCUMENT_NAME,
      required: true,
    },
    spu_image_ratio: {
      type: SchemaTypes.String,
      enum: Object.values(IMAGE_RATIO),
      default: IMAGE_RATIO.ONE_ONE,
    },
    spu_images: { type: [SchemaTypes.String], required: true },
    spu_thumb: { type: SchemaTypes.String, required: true },
    spu_video: { type: SchemaTypes.String },
    spu_name: { type: SchemaTypes.String, required: true },
    spu_slug: { type: SchemaTypes.String, required: true, unique: true },
    spu_categories: { type: [SchemaTypes.String], required: true },
    spu_description: { type: SchemaTypes.String, required: true },
    spu_attributes: { type: SchemaTypes.Mixed, required: true },
    spu_price: { type: SchemaTypes.Number },
    spu_stock: { type: SchemaTypes.Number },
    spu_is_preorder: { type: SchemaTypes.Boolean, required: false },
    spu_is_weight_for_sku: {
      type: SchemaTypes.Boolean,
      default: false,
      required: true,
    },
    spu_weight: { type: SchemaTypes.Number },
    spu_usage_status: {
      type: SchemaTypes.String,
      enum: Object.values(USAGE_STATUS),
      default: USAGE_STATUS.NEW,
    },
    spu_variations: [
      {
        name: SchemaTypes.String,
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
    spu_sold: { type: SchemaTypes.Number, default: 0 },
    spu_sort: { type: SchemaTypes.Number, default: 0 },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

export default model(DOCUMENT_NAME, SPUSchema);
