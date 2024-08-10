import { Schema, SchemaTypes, model } from "mongoose";

import { APIKEY_SCHEMA_CONST } from "../configs/schema.const.config.js";
const { DOCUMENT_NAME, COLLECTION_NAME } = APIKEY_SCHEMA_CONST;

const APIKeySchema = new Schema(
  {
    key: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    active: {
      type: SchemaTypes.Boolean,
      default: true,
    },
    permissions: {
      type: [SchemaTypes.String],
      require: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, APIKeySchema);
