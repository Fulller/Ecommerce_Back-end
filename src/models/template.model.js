import { Schema, SchemaTypes, model } from "mongoose";
import { TEMPLATE_SCHEMA_CONST } from "../configs/schema.const.config.js";

const { DOCUMENT_NAME, COLLECTION_NAME, STATUS } = TEMPLATE_SCHEMA_CONST;

const TemplateSchema = new Schema(
  {
    tem_id: { type: SchemaTypes.Number, required: true },
    tem_name: { type: SchemaTypes.String, required: true },
    tem_status: {
      type: SchemaTypes.String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
    },
    tem_html: { type: SchemaTypes.String, required: true },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, TemplateSchema);
