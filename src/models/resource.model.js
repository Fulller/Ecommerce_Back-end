import { Schema, SchemaTypes, model } from "mongoose";
import { RESOURCE_SCHEMA_CONST } from "../configs/schema.const.config.js";

const { DOCUMENT_NAME, COLLECTION_NAME } = RESOURCE_SCHEMA_CONST;
const ResourceSchema = new Schema(
  {
    src_name: {
      type: SchemaTypes.String,
      unique: true,
      require: true,
    },
    src_slug: {
      type: SchemaTypes.String,
      unique: true,
      require: true,
    },
    src_description: {
      type: SchemaTypes.String,
      default: "",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, ResourceSchema);
