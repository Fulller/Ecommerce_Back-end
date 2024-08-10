import Shop from "../shop.model.js";

const ShopRepo = {
  async findByOwnerId(ownerId) {
    return Shop.findOne({ shop_owner: ownerId });
  },
};
export default ShopRepo;
