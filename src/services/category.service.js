import Category from "../models/category.model.js";
import { getCleanData } from "../utils/index.js";
import createHttpError from "http-errors";

const CategoryService = {
  async addCategory({ cat_name, cat_parent = null, cat_attributes = [] }) {
    let parentCategory = null;
    let newCategoryLeft = 1;
    let newCategoryRight = 2;
    let newCategoryLevel = 0;

    if (cat_parent) {
      parentCategory = await Category.findById(cat_parent);
      if (!parentCategory) {
        throw new Error("Parent category not found");
      }
      newCategoryLeft = parentCategory.cat_right;
      newCategoryRight = parentCategory.cat_right + 1;
      newCategoryLevel = parentCategory.cat_level + 1;

      // Increment the `left` and `right` values of existing nodes
      await Category.updateMany(
        { cat_right: { $gte: parentCategory.cat_right } },
        { $inc: { cat_left: 2, cat_right: 2 } }
      );

      await Category.updateMany(
        { cat_left: { $gte: parentCategory.cat_right } },
        { $inc: { cat_left: 2, cat_right: 2 } }
      );
    }

    const newCategory = new Category({
      cat_name,
      cat_left: newCategoryLeft,
      cat_right: newCategoryRight,
      cat_level: newCategoryLevel,
      cat_parent: parentCategory ? parentCategory._id : null,
      cat_attributes: cat_attributes,
    });

    await newCategory.save();
    return getCleanData(newCategory);
  },
  async addCategories(categories, parentCategoryId = null) {
    let left = (await Category.countDocuments()) * 2;
    const processCategories = async (
      categories,
      parentCategoryId,
      level = 0
    ) => {
      for (const category of categories) {
        const newCategory = new Category({
          cat_name: category.cat_name,
          cat_left: left++,
          cat_right: left++,
          cat_level: level,
          cat_parent: parentCategoryId,
          cat_attributes: category.cat_attributes || [],
        });
        await newCategory.save();
        if (category.children && category.children.length > 0) {
          await processCategories(
            category.children,
            newCategory._id,
            level + 1
          );
        }
      }
    };

    await processCategories(categories, parentCategoryId);
    return { message: "Categories added successfully" };
  },
  async getCategoryAttributes(categoryId) {
    const category = await Category.findById(categoryId).select(
      "cat_attributes"
    );
    if (!category) {
      throw new Error("Category not found");
    }
    return category.cat_attributes;
  },
  async getAllCategories() {
    const categories = await Category.find().sort("cat_left").lean();
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat, children: [] };
    });
    const rootCategories = [];
    categories.forEach((cat) => {
      if (cat.cat_parent) {
        categoryMap[cat.cat_parent].children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });

    return rootCategories;
  },
  async getCategoryWithAncestors(categoryId) {
    const category = await Category.findById(categoryId).populate({
      path: "cat_parent",
    });

    if (!category) {
      throw createHttpError(
        404,
        "CategoryService :: getCategoryWithAncestors :: category not found"
      );
    }

    let ancestors = [category];
    let currentCategory = category;

    while (currentCategory.cat_parent) {
      currentCategory = await Category.findById(currentCategory.cat_parent);
      if (currentCategory) {
        ancestors.push(currentCategory);
      } else {
        break;
      }
    }

    return {
      category: category,
      ancestors: ancestors.reverse(),
    };
  },
};

export default CategoryService;
