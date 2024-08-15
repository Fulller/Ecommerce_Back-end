import Product from "../models/product.model.js";
import ShopRepository from "../models/repositories/shop.repo.js";
import CategoryRepository from "../models/repositories/category.repo.js";
import CategoryService from "./category.service.js";
import SKUService from "./sku.service.js";
import createHttpError from "http-errors";
import { productSlug, skuSlug, getCleanData } from "../utils/index.js";
import _ from "lodash";

const ProductService = {
  async newProduct(ownerId, productData) {
    const [shop, category] = await Promise.all([
      ShopRepository.findByOwnerId(ownerId),
      CategoryRepository.findById(productData.product_category).lean(),
    ]);
    if (!shop) {
      throw createHttpError(404, "ProductService :: shop not found");
    }
    if (!category) {
      throw createHttpError(404, "ProductService :: catetory not found");
    }
    let skuList = _.get(productData, "product_skus");
    productData = _.chain(productData)
      .set("product_shop", shop._id)
      .set("product_slug", productSlug(productData.product_name))
      .set("product_skus", [])
      .value();
    const newProduct = await Product.create(productData);
    skuList = _.chain(skuList)
      .map((sku) =>
        _.chain(sku)
          .set("sku_product", newProduct._id)
          .set(
            "sku_slug",
            skuSlug(
              productData.product_name,
              productData.product_variations,
              sku.sku_tier_idx
            )
          )
          .value()
      )
      .value();
    const newSKUList = await SKUService.createMany(skuList);
    newProduct.product_skus = _.map(newSKUList, (sku) => sku._id);
    await newProduct.save();
    return getCleanData(newProduct);
  },
  async update({ ownerId, productId }, productData) {
    const [shop, category] = await Promise.all([
      ShopRepository.findByOwnerId(ownerId),
      CategoryRepository.findById(productData.product_category).lean(),
    ]);
    if (!shop) {
      throw createHttpError(404, "ProductService :: update :: shop not found");
    }
    if (!category) {
      throw createHttpError(
        404,
        "ProductService :: update :: category not found"
      );
    }
    let product = await Product.findOne({
      _id: productId,
      product_shop: shop._id,
    });
    if (!product) {
      throw createHttpError(
        404,
        "ProductService :: update :: product not found"
      );
    }

    const { product_skus, product_name } = productData;
    productData = _.chain(productData)
      .omit([
        "_id",
        "product_skus",
        "product_sold",
        "product_sort",
        "product_shop",
        "product_slug",
      ])
      .set("product_slug", productSlug(product_name))
      .value();

    await product.updateOne(productData, { upsert: true, new: true });
    const skuList = _.chain(product_skus)
      .map((sku) =>
        _.chain(sku)
          .set("sku_product", productId)
          .set(
            "sku_slug",
            skuSlug(
              productData.product_name,
              productData.product_variations,
              sku.sku_tier_idx
            )
          )
          .value()
      )
      .value();
    const isNewSKUs = !_.hasIn(skuList[0], "_id");
    if (isNewSKUs) {
      await SKUService.deleteMany(product.product_skus);
    }
    const updatedSKUList = await SKUService.updateOrCreateMany(skuList);
    product.product_skus = _.map(updatedSKUList, (sku) => sku._id);
    await product.save();
    return product;
  },
  async getByShop(ownerId, productId) {
    const shop = await ShopRepository.findByOwnerId(ownerId);
    if (!shop) {
      throw createHttpError(404, "Shop not found");
    }
    const product = await Product.findOne({
      _id: productId,
      product_shop: shop._id,
    }).populate({
      path: "product_skus",
    });
    if (!product) {
      throw createHttpError(404, "Product not found");
    }
    const { ancestors, category } =
      await CategoryService.getCategoryWithAncestors(product.product_category);
    return _.chain(getCleanData(product))
      .set("product_category", category)
      .set("product_category_ancestors", ancestors)
      .value();
  },
};

export default ProductService;
