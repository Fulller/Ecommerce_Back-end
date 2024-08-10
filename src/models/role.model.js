import { Schema, SchemaTypes, model } from "mongoose";
import {
  ROLE_SCHEMA_CONST,
  RESOURCE_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const { DOCUMENT_NAME, COLLECTION_NAME, NAME, STATUS, POSSESSIONS, ACTIONS } =
  ROLE_SCHEMA_CONST;

const GrantSchema = new Schema(
  {
    resource: {
      type: SchemaTypes.ObjectId,
      ref: RESOURCE_SCHEMA_CONST.DOCUMENT_NAME,
      require: true,
    },
    action: {
      type: SchemaTypes.String,
      require: true,
      enum: Object.values(ACTIONS),
    },
    possession: {
      type: SchemaTypes.String,
      enum: Object.values(POSSESSIONS),
      default: POSSESSIONS.OWN,
    },
    attribute: { type: SchemaTypes.String, default: "*" },
  },
  { _id: true }
);

const RoleSchema = new Schema(
  {
    rol_name: {
      type: SchemaTypes.String,
      default: NAME.USER,
      unique: true,
      enum: Object.values(NAME),
    },
    rol_slug: {
      type: SchemaTypes.String,
      unique: true,
      require: true,
    },
    rol_status: {
      type: SchemaTypes.String,
      default: STATUS.ACTIVE,
      enum: Object.values(STATUS),
    },
    rol_description: {
      type: SchemaTypes.String,
      default: "",
    },
    rol_grants: [GrantSchema],
    rol_inherited: [
      {
        type: SchemaTypes.String,
        default: [],
      },
    ],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
export default model(DOCUMENT_NAME, RoleSchema);
