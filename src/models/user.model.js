import { Schema, SchemaTypes, model } from "mongoose";
import {
  USER_SCHEMA_CONST,
  ROLE_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { DOCUMENT_NAME, COLLECTION_NAME, STATUS } = USER_SCHEMA_CONST;

const UserSchema = new Schema(
  {
    usr_avatar: {
      type: SchemaTypes.String,
    },
    usr_slug: {
      type: SchemaTypes.String,
    },
    usr_name: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_password: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_email: {
      type: SchemaTypes.String,
    },
    usr_phone: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_sex: {
      type: SchemaTypes.String,
      default: "",
    },
    usr_data_of_birth: {
      type: SchemaTypes.Date,
      default: null,
    },
    usr_status: {
      type: SchemaTypes.String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
    usr_isFromSocial: { type: SchemaTypes.Boolean, default: false },
    usr_provider: {
      name: { type: SchemaTypes.String },
      id: { type: SchemaTypes.String },
    },
    usr_role: {
      type: SchemaTypes.ObjectId,
      ref: ROLE_SCHEMA_CONST.DOCUMENT_NAME,
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

export default model(DOCUMENT_NAME, UserSchema);
