import { Schema, SchemaTypes, model } from "mongoose";
import {
  COMMENT_SCHEMA_CONST,
  PRODUCT_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { COLLECTION_NAME, DOCUMENT_NAME } = COMMENT_SCHEMA_CONST;
const commentSchema = new Schema(
  {
    comment_productId: {
      type: SchemaTypes.ObjectId,
      ref: PRODUCT_SCHEMA_CONST.DOCUMENT_NAME,
    },
    comment_useId: { type: SchemaTypes.Number },
    comment_content: { type: SchemaTypes.String, default: "" },
    comment_parentId: { type: SchemaTypes.ObjectId, ref: DOCUMENT_NAME },
    comment_left: { type: SchemaTypes.Number, default: 0 },
    comment_right: { type: SchemaTypes.Number, default: 0 },
    isDelete: { type: SchemaTypes.Boolean, default: false },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, commentSchema);
