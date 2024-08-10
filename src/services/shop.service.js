import Shop from "../models/shop.model.js";
import ShopRepository from "../models/repositories/shop.repo.js";
// import { pickAccountData } from "../utils/index.js";
// import { RoleShop } from "../configs/const.config.js";
import { SHOP_SCHEMA_CONST } from "../configs/schema.const.config.js";
import createHttpError from "http-errors";
// import bcrypt from "bcrypt";
import _ from "lodash";

const ShopService = {
  // async signUp({ name, email, password }) {
  //   const holderShop = await Shop.findOne({ email }).lean();
  //   if (holderShop) {
  //     throw createHttpError(400, "Shop already registered!");
  //   }
  //   const passwordHash = await bcrypt.hash(password, 10);
  //   const newShop = await Shop.create({
  //     name,
  //     email,
  //     password: passwordHash,
  //     roles: [RoleShop.SHOP],
  //   });
  //   return pickAccountData(newShop);
  // },
  // async logIn({ email, password }) {
  //   const shop = await Shop.findOne({ email }).lean();
  //   if (!shop) {
  //     throw createHttpError(401, "Invalid email");
  //   }
  //   const result = await bcrypt.compare(password, shop.password);
  //   if (!result) {
  //     throw createHttpError(401, "Invalid password");
  //   }
  //   return pickAccountData(shop);
  // },
  async userUpgradeToShop(ownerId, shopData) {
    return Shop.findOneAndUpdate(
      { shop_owner: ownerId },
      {
        $set: {
          ...shopData,
          shop_verify: true,
          shop_status: SHOP_SCHEMA_CONST.STATUS.ACTIVE,
        },
      },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    );
  },
  async getInfomation(onwerId) {
    let shop = await ShopRepository.findByOwnerId(onwerId);
    if (!shop) {
      throw createHttpError(
        404,
        "Shopservice :: getInfomation :: ownerID not found"
      );
    }
    shop = (await shop.populate("shop_owner")).toObject();
    return _.chain(shop)
      .omit(["__v", "updatedAt", "createdAt"])
      .set(
        "shop_owner",
        _.omit(shop.shop_owner, [
          "-usr_password",
          "-createdAt",
          "-updatedAt",
          "-__v",
        ])
      )
      .value();
  },
};

export default ShopService;
