import { Schema, SchemaTypes, model } from "mongoose";

import {
  PRODUCT_SCHEMA_CONST,
  SKU_SCHEMA_CONST,
  SHOP_SCHEMA_CONST,
  CATEGORY_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { DOCUMENT_NAME, COLLECTION_NAME, IMAGE_RATIO, USAGE_STATUS } =
  PRODUCT_SCHEMA_CONST;

const ProductSchema = new Schema(
  {
    product_shop: {
      type: SchemaTypes.ObjectId,
      ref: SHOP_SCHEMA_CONST.DOCUMENT_NAME,
      required: true,
    },
    product_image_ratio: {
      type: SchemaTypes.String,
      enum: Object.values(IMAGE_RATIO),
      default: IMAGE_RATIO.ONE_ONE,
    },
    product_images: { type: [SchemaTypes.String], required: true },
    product_thumb: { type: SchemaTypes.String, required: true },
    product_video: { type: SchemaTypes.String },
    product_name: { type: SchemaTypes.String, required: true },
    product_slug: { type: SchemaTypes.String, required: true, unique: true },
    product_category: {
      type: SchemaTypes.ObjectId,
      ref: CATEGORY_SCHEMA_CONST.DOCUMENT_NAME,
      required: true,
    },
    product_description: { type: SchemaTypes.String, required: true },
    product_attributes: [
      {
        name: { type: SchemaTypes.String, require: true },
        value: { type: SchemaTypes.String, require: true },
        unit: { type: SchemaTypes.String },
      },
    ],
    product_is_preorder: { type: SchemaTypes.Boolean, required: false },
    product_usage_status: {
      type: SchemaTypes.String,
      enum: Object.values(USAGE_STATUS),
      default: USAGE_STATUS.NEW,
    },
    product_variations: [
      {
        name: SchemaTypes.String,
        options: [SchemaTypes.String],
      },
    ],
    product_skus: [
      {
        type: SchemaTypes.ObjectId,
        ref: SKU_SCHEMA_CONST.DOCUMENT_NAME,
        default: [],
      },
    ],
    product_sold: { type: SchemaTypes.Number, default: 0 },
    product_sort: { type: SchemaTypes.Number, default: 0 },
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
    isDeleted: { type: SchemaTypes.Boolean, default: false, select: false },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
ProductSchema.index({
  "product_attributes.name": 1,
  "product_attributes.value": 1,
});
export default model(DOCUMENT_NAME, ProductSchema);
