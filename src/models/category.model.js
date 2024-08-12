import { Schema, SchemaTypes, model } from "mongoose";
import { CATEGORY_SCHEMA_CONST } from "../configs/schema.const.config.js";

const { COLLECTION_NAME, DOCUMENT_NAME } = CATEGORY_SCHEMA_CONST;

const AttributeSchema = new Schema({
  att_name: { type: SchemaTypes.String, required: true },
  att_options: { type: [SchemaTypes.String], required: true },
  att_is_enter_by_hand: { type: SchemaTypes.Boolean, default: false },
  att_units: { type: [SchemaTypes.String] },
});

const CategorySchema = new Schema(
  {
    cat_name: { type: SchemaTypes.String, required: true },
    cat_left: { type: SchemaTypes.Number, required: true },
    cat_right: { type: SchemaTypes.Number, required: true },
    cat_level: { type: SchemaTypes.Number, default: 0 },
    cat_parent: { type: SchemaTypes.ObjectId, ref: DOCUMENT_NAME },
    cat_attributes: { type: [AttributeSchema], default: [] },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export { AttributeSchema };
export default model(DOCUMENT_NAME, CategorySchema);
