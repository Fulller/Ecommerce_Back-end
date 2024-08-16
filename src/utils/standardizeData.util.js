import _ from "lodash";

function standardizeCart(cartItems) {
  const shopMap = new Map();

  cartItems.forEach((cartItem) => {
    const product = cartItem.sku.sku_product;
    const sku = cartItem.sku;
    const shop = product.product_shop;

    if (sku.isDeleted) {
      return;
    }
    if (!shopMap.has(shop._id)) {
      shopMap.set(shop._id, {
        _id: shop._id,
        shop_is_mall: shop.shop_is_mall,
        shop_name: shop.shop_name,
        shop_cart_items: [],
      });
    }

    const variations = product.product_variations.map((variation, index) => ({
      name: variation.name,
      value: variation.options[sku.sku_tier_idx[index]],
    }));

    const newCartItem = {
      _id: cartItem._id,
      product: {
        product_thumb: product.product_thumb,
        product_name: product.product_name,
        product_variations: product.product_variations,
      },
      sku: {
        _id: sku._id,
        sku_image: sku.sku_image,
        sku_tier_idx: sku.sku_tier_idx,
      },
      variations: variations,
      price: sku.sku_price,
      quantity: cartItem.quantity,
      totalPrice: sku.sku_price * cartItem.quantity,
    };

    // Add the cart item to the shop's cart items
    shopMap.get(shop._id).shop_cart_items.push(newCartItem);
  });

  // Convert the map values to an array
  return Array.from(shopMap.values());
}

export { standardizeCart };
