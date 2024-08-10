import { Schema, SchemaTypes, model } from "mongoose";
import slugify from "slugify";
import {
  PRODUCT_SCHEMA_CONST,
  SHOP_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { COLLECTION_NAME, DOCUMENT_NAME, CLOTHING, ELECTRONIC } =
  PRODUCT_SCHEMA_CONST;
const DOCUMENT_NAME_CLOTHING = CLOTHING.DOCUMENT_NAME;
const COLLECTION_NAME_CLOTHING = CLOTHING.COLLECTION_NAME;
const DOCUMENT_NAME_ELECTRONIC = ELECTRONIC.DOCUMENT_NAME;
const COLLECTION_NAME_ELECTRONIC = ELECTRONIC.COLLECTION_NAME;

const productSchema = new Schema(
  {
    product_name: {
      type: SchemaTypes.String,
      required: true,
    },
    product_slug: {
      type: SchemaTypes.String,
    },
    product_thumb: {
      type: SchemaTypes.String,
      required: true,
    },
    product_description: {
      type: SchemaTypes.String,
    },
    product_price: {
      type: SchemaTypes.Number,
      required: true,
    },
    product_quantity: {
      type: SchemaTypes.Number,
      required: true,
    },
    product_type: {
      type: SchemaTypes.String,
      required: true,
      enum: [DOCUMENT_NAME_CLOTHING, DOCUMENT_NAME_ELECTRONIC],
    },
    product_shop: {
      type: SchemaTypes.ObjectId,
      ref: SHOP_SCHEMA_CONST.DOCUMENT_NAME,
    },
    product_attributes: {
      type: SchemaTypes.Mixed,
      required: true,
    },
    product_ratingsAverage: {
      type: SchemaTypes.Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be above 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: {
      type: [SchemaTypes.String],
      default: [],
    },
    isDraft: {
      type: SchemaTypes.Boolean,
      default: true,
      index: true,
      select: false,
    },
    isPublished: {
      type: SchemaTypes.Boolean,
      default: false,
      index: true,
      select: false,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
productSchema.index({ product_name: "text", product_description: "text" });
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

const clothingSchema = new Schema(
  {
    brand: { type: SchemaTypes.String, require: true },
    size: { type: SchemaTypes.String },
    material: { type: SchemaTypes.String },
    shop: {
      type: SchemaTypes.ObjectId,
      ref: SHOP_SCHEMA_CONST.DOCUMENT_NAME,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME_CLOTHING }
);

const electronicSchema = new Schema(
  {
    manufacturer: { type: SchemaTypes.String, require: true },
    model: { type: SchemaTypes.String },
    color: { type: SchemaTypes.String },
    shop: {
      type: SchemaTypes.ObjectId,
      ref: SHOP_SCHEMA_CONST.DOCUMENT_NAME,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME_ELECTRONIC }
);
export default model(DOCUMENT_NAME, productSchema);
export const Product = model(DOCUMENT_NAME, productSchema);
export const Clothing = model(DOCUMENT_NAME_CLOTHING, clothingSchema);
export const Electronic = model(DOCUMENT_NAME_ELECTRONIC, electronicSchema);
