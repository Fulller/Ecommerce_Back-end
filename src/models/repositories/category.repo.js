import Category from "../category.model.js";

const CategoryRepository = {
  findById(catId) {
    return Category.findById(catId);
  },
};

export default CategoryRepository;
