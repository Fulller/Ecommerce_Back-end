import Shop from "../shop.model.js";

const ShopRepository = {
  async findByOwnerId(ownerId) {
    return Shop.findOne({ shop_owner: ownerId });
  },
};
export default ShopRepository;
