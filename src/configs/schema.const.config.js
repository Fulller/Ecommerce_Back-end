const USER_SCHEMA_CONST = {
  DOCUMENT_NAME: "User",
  COLLECTION_NAME: "Users",
  STATUS: {
    ACTIVE: "active",
    PENDING: "pending",
    BLOCKED: "blocked",
  },
};
const ROLE_SCHEMA_CONST = {
  DOCUMENT_NAME: "Role",
  COLLECTION_NAME: "Roles",
  NAME: { USER: "user", SHOP: "shop", ADMIN: "admin", GUEST: "guest" },
  STATUS: {
    PENDING: "peding",
    ACTIVE: "active",
    BLOCK: "block",
  },
  POSSESSIONS: {
    ANY: "any",
    OWN: "own",
  },
  ACTIONS: {
    CREATE: "create",
    READ: "read",
    UPDATE: "update",
    DELETE: "delete",
  },
};
const RESOURCE_SCHEMA_CONST = {
  DOCUMENT_NAME: "Resource",
  COLLECTION_NAME: "Resources",
};
const SHOP_SCHEMA_CONST = {
  DOCUMENT_NAME: "Shop",
  COLLECTION_NAME: "Shops",
  STATUS: { INACTIVE: "inactive", ACTIVE: "active" },
};
const BUYER_SCHEMA_CONST = {
  DOCUMENT_NAME: "Buyer",
  COLLECTION_NAME: "Buyers",
};
const ADMIN_SCHEMA_CONST = {
  DOCUMENT_NAME: "Admin",
  COLLECTION_NAME: "Admins",
};
const APIKEY_SCHEMA_CONST = {
  DOCUMENT_NAME: "APIKey",
  COLLECTION_NAME: "APIKeys",
};
const CART_SCHEMA_CONST = {
  DOCUMENT_NAME: "Cart",
  COLLECTION_NAME: "Carts",
  STATE: {
    ACTIVE: "active",
    COMPLETED: "completed",
    FAILED: "failed",
    PENDING: "pending",
  },
};
const COMMENT_SCHEMA_CONST = {
  DOCUMENT_NAME: "Comment",
  COLLECTION_NAME: "Comments",
};
const PRODUCT_SCHEMA_CONST = {
  DOCUMENT_NAME: "Product",
  COLLECTION_NAME: "Products",
  CLOTHING: {
    DOCUMENT_NAME: "Clothing",
    COLLECTION_NAME: "Clothes",
  },
  ELECTRONIC: {
    DOCUMENT_NAME: "Electronic",
    COLLECTION_NAME: "Electronics",
  },
};
const DISCOUNT_SCHEMA_CONST = {
  DOCUMENT_NAME: "Discount",
  COLLECTION_NAME: "Discounts",
  APPLY_TO: {
    ALL: "all",
    SPECIFIC: "specific",
  },
  TYPE: {
    FIXED_AMOUNT: "fixed_amount",
    PERCENTAGE: "percentage",
    FREE_SHIPPING: "free_shipping",
    VOLUME: "volume",
    SEASONAL: "seasonal",
  },
};
const INVENTORY_SCHEMA_CONST = {
  DOCUMENT_NAME: "Inventory",
  COLLECTION_NAME: "Inventories",
};
const NOTIFICATION_SCHEMA_CONST = {
  DOCUMENT_NAME: "Notification",
  COLLECTION_NAME: "Notifications",
  TYPE: {
    ORDER_001: "ORDER-001",
    ORDER_002: "ORDER-002",
    PROMOTION_001: "PROMOTION-001",
    SHOP_001: "SHOP-001",
  },
};
const ORDER_SCHEMA_CONST = {
  DOCUMENT_NAME: "Order",
  COLLECTION_NAME: "Orders",
  STATUS: {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    SHIPPED: "shipped",
    CANCELLED: "cancelled",
    DELIVERED: "delivered",
  },
};
const OTP_SCHEMA_CONST = {
  DOCUMENT_NAME: "OTP",
  COLLECTION_NAME: "OTPs",
  STATUS: {
    PENDING: "peding",
    ACTIVE: "active",
    BLOCK: "block",
  },
};
const SKU_SCHEMA_CONST = {
  DOCUMENT_NAME: "SKU",
  COLLECTION_NAME: "SKUs",
};
const SPU_SCHEMA_CONST = {
  DOCUMENT_NAME: "SPU",
  COLLECTION_NAME: "SPUs",
  IMAGE_RATIO: {
    ONE_ONE: "1:1",
    THREE_FOUR: "3:4",
    SIXTEEN_NINE: "16:9",
  },
  USAGE_STATUS: {
    NEW: "new",
    USED: "used",
    REFURBISHED: "refurbished",
  },
};
const TEMPLATE_SCHEMA_CONST = {
  DOCUMENT_NAME: "Template",
  COLLECTION_NAME: "Templates",
  STATUS: {
    PENDING: "peding",
    ACTIVE: "active",
    BLOCK: "block",
  },
};
const TOKEN_SCHEMA_CONST = {
  DOCUMENT_NAME: "Token",
  COLLECTION_NAME: "Tokens",
};
const CATEGORY_SCHEMA_CONST = {
  DOCUMENT_NAME: "Category",
  COLLECTION_NAME: "Categories",
};
export {
  USER_SCHEMA_CONST,
  SHOP_SCHEMA_CONST,
  ROLE_SCHEMA_CONST,
  BUYER_SCHEMA_CONST,
  ADMIN_SCHEMA_CONST,
  RESOURCE_SCHEMA_CONST,
  APIKEY_SCHEMA_CONST,
  CART_SCHEMA_CONST,
  COMMENT_SCHEMA_CONST,
  PRODUCT_SCHEMA_CONST,
  DISCOUNT_SCHEMA_CONST,
  INVENTORY_SCHEMA_CONST,
  NOTIFICATION_SCHEMA_CONST,
  ORDER_SCHEMA_CONST,
  OTP_SCHEMA_CONST,
  SKU_SCHEMA_CONST,
  SPU_SCHEMA_CONST,
  TEMPLATE_SCHEMA_CONST,
  TOKEN_SCHEMA_CONST,
  CATEGORY_SCHEMA_CONST,
};
