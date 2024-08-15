import Joi from "joi";
import { HEADER } from "../configs/const.config.js";
import {
  ROLE_SCHEMA_CONST,
  DISCOUNT_SCHEMA_CONST,
  PRODUCT_SCHEMA_CONST,
} from "../configs/schema.const.config.js";

const Joi_ObjectId = Joi.string()
  .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
  .required();
const Joi_ObjectId_Not_Requied = Joi.string().pattern(
  new RegExp("^[0-9a-fA-F]{24}$")
);
const Joi_HTML = Joi.string()
  .pattern(/<\/?[a-z][\s\S]*>/i, "HTML tags")
  .required();

const APIKeyValidate = {
  add: Joi.object({
    key: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required(),
  }),
};
const ShopValidate = {
  signUp: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(1).max(100).required(),
    password: Joi.string().min(6).max(100).required(),
  }),
  logIn: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  }),
  logOut: Joi.object({
    [HEADER.REFRESHTOKEN]: Joi.string().required(),
  }),
  refreshToken: Joi.object({
    [HEADER.REFRESHTOKEN]: Joi.string().required(),
  }),
};
const DiscountValidate = {
  createDiscountByShop: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.values(DISCOUNT_SCHEMA_CONST.TYPE))
      .required(),
    value: Joi.number().required(),
    code: Joi.string(),
    start_date: Joi.date().required().greater("now").messages({
      "date.greater":
        "start_date must be greater than or equal to the current date",
    }),
    end_date: Joi.date().required().greater(Joi.ref("start_date")).messages({
      "date.greater": "end_date must be greater than start_date",
    }),
    max_uses: Joi.number().required(),
    users_used: Joi.array(),
    max_uses_per_user: Joi.number().required(),
    min_order_value: Joi.number().required(),
    is_active: Joi.bool(),
    applies_to: Joi.string()
      .valid(...Object.values(DISCOUNT_SCHEMA_CONST.APPLY_TO))
      .required(),
    product_ids: Joi.array(),
  }).with("start_date", "end_date"),
};
const CommentValidate = {
  addComment: Joi.object({
    productId: Joi_ObjectId,
    content: Joi.string().required(),
    userId: Joi.number().required(),
    parentId: Joi.string()
      .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
      .allow(null, ""),
  }),
  deleteComment: Joi.object({
    productId: Joi_ObjectId,
    commentId: Joi_ObjectId,
  }),
};
const UploadValidate = {
  singleFile: Joi.any().required().messages({
    "any.required": "There must be a file",
  }),
  deleteImage: Joi.object({
    imageUrl: Joi.string().uri().required(),
  }),
  deleteFile: Joi.object({
    fileUrl: Joi.string().uri().required(),
  }),
};
const RBACValidate = {
  newRole: Joi.object({
    rol_name: Joi.string().required(),
    rol_slug: Joi.string().required(),
    rol_status: Joi.string()
      .valid(...Object.values(ROLE_SCHEMA_CONST.STATUS))
      .required(),
    rol_grants: Joi.array().items({
      resource: Joi_ObjectId,
      action: Joi.string()
        .valid(...Object.values(ROLE_SCHEMA_CONST.ACTIONS))
        .required(),
      possession: Joi.string()
        .valid(...Object.values(ROLE_SCHEMA_CONST.POSSESSIONS))
        .required(),
      attribute: Joi.string(),
    }),
  }),
  newResource: Joi.object({
    src_name: Joi.string().required(),
    src_slug: Joi.string().required(),
    src_description: Joi.string(),
  }),
  addGrantToRole: Joi.object({
    role_id: Joi_ObjectId,
    resource: Joi_ObjectId,
    action: Joi.string()
      .valid(...Object.values(ROLE_SCHEMA_CONST.ACTIONS))
      .required(),
    possession: Joi.string()
      .valid(...Object.values(ROLE_SCHEMA_CONST.POSSESSIONS))
      .required(),
    attribute: Joi.string(),
  }),
  removeGrantFromRole: Joi.object({
    role_id: Joi_ObjectId,
    grant_id: Joi_ObjectId,
  }),
  updateGrantInRole: Joi.object({
    role_id: Joi_ObjectId,
    grant_id: Joi_ObjectId,
    resource: Joi_ObjectId,
    action: Joi.string().valid(...Object.values(ROLE_SCHEMA_CONST.ACTIONS)),
    possession: Joi.string().valid(
      ...Object.values(ROLE_SCHEMA_CONST.POSSESSIONS)
    ),
    attribute: Joi.string(),
  }),
};
const TemplateValidate = {
  add: Joi.object({
    tem_id: Joi.number().required(),
    tem_name: Joi.string().required(),
    tem_html: Joi_HTML,
  }),
};
const UserValidate = {
  signUp: Joi.object({ email: Joi.string().email().required() }),
  beforeForgotPassword: Joi.object({ email: Joi.string().email().required() }),
  afterForgotPassword: Joi.object({
    password: Joi.string().required(),
    token: Joi.any().required(),
  }),
  logIn: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  verifySignUpOTP: Joi.object({
    email: Joi.string().email().required(),
    token: Joi.any().required(),
  }),
  userUpgradeToShop: Joi.object({
    shop_name: Joi.string().required(),
  }),
  refreshToken: Joi.object({
    refreshtoken: Joi.string().required(),
  }),
};
const ProductValidate = {
  create: Joi.object({
    product_image_ratio: Joi.string()
      .valid(...Object.values(PRODUCT_SCHEMA_CONST.IMAGE_RATIO))
      .required(),
    product_images: Joi.array()
      .items(Joi.string().uri().required())
      .min(1)
      .required(),
    product_thumb: Joi.string().uri().required(),
    product_video: Joi.string().uri().required(),
    product_name: Joi.string().min(1).max(255).required(),
    product_category: Joi_ObjectId.required(),
    product_description: Joi.string().min(1).required(),
    product_attributes: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          value: Joi.string().required(),
          unit: Joi.any(),
        }).required()
      )
      .min(1)
      .required(),
    product_is_preorder: Joi.boolean().required(),
    product_usage_status: Joi.string()
      .valid(...Object.values(PRODUCT_SCHEMA_CONST.USAGE_STATUS))
      .required(),
    product_variations: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          options: Joi.array().items(Joi.string().required()).min(1).required(),
        })
      )
      .required(),
    product_skus: Joi.array()
      .items(
        Joi.object({
          sku_tier_idx: Joi.array()
            .items(Joi.number().integer().min(0))
            .default([]),
          sku_default: Joi.boolean().default(false),
          sku_price: Joi.number().positive().required(),
          sku_stock: Joi.number().integer().min(0).required(),
          sku_image: Joi.string().uri().required(),
          sku_weight: Joi.number().positive().required(),
        }).required()
      )
      .min(1)
      .required(),
  }),
  update: Joi.object({
    productId: Joi_ObjectId,
    product_image_ratio: Joi.string()
      .valid(...Object.values(PRODUCT_SCHEMA_CONST.IMAGE_RATIO))
      .required(),
    product_images: Joi.array()
      .items(Joi.string().uri().required())
      .min(1)
      .required(),
    product_thumb: Joi.string().uri().required(),
    product_video: Joi.string().uri().required(),
    product_name: Joi.string().min(1).max(255).required(),
    product_slug: Joi.string(),
    product_category: Joi_ObjectId.required(),
    product_description: Joi.string().min(1).required(),
    product_attributes: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          value: Joi.string().required(),
          unit: Joi.any(),
        }).required()
      )
      .min(1)
      .required(),
    product_is_preorder: Joi.boolean().required(),
    product_usage_status: Joi.string()
      .valid(...Object.values(PRODUCT_SCHEMA_CONST.USAGE_STATUS))
      .required(),
    product_variations: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          options: Joi.array().items(Joi.string().required()).min(1).required(),
        })
      )
      .required(),
    product_skus: Joi.array()
      .items(
        Joi.object({
          _id: Joi_ObjectId_Not_Requied,
          sku_product: Joi_ObjectId_Not_Requied,
          sku_inventory: Joi_ObjectId_Not_Requied,
          sku_slug: Joi.string(),
          sku_tier_idx: Joi.array()
            .items(Joi.number().integer().min(0))
            .default([]),
          sku_default: Joi.boolean().default(false),
          sku_price: Joi.number().positive().required(),
          sku_stock: Joi.number().integer().min(0).required(),
          sku_image: Joi.string().uri().required(),
          sku_weight: Joi.number().positive().required(),
        }).required()
      )
      .min(1)
      .required(),
  }),
  getByShop: Joi.object({
    productId: Joi_ObjectId,
  }),
};
const SKUValidate = {};
const CategoryValidate = {
  addCategory: Joi.object({
    cat_name: Joi.string().required(),
    cat_parent: Joi.any(),
    cat_attributes: Joi.array().items(
      Joi.object({
        att_name: Joi.string().required(),
        att_options: Joi.array().items(Joi.string().required()).required(),
        att_is_enter_by_hand: Joi.boolean(),
        att_units: Joi.array().items(Joi.string().required()),
      })
    ),
  }),
  addCategories: Joi.array().required(),
  getCategoryAttributes: Joi.object({
    categoryId: Joi_ObjectId,
  }),
};

export {
  ShopValidate,
  DiscountValidate,
  CommentValidate,
  UploadValidate,
  APIKeyValidate,
  RBACValidate,
  TemplateValidate,
  UserValidate,
  ProductValidate,
  SKUValidate,
  CategoryValidate,
};
