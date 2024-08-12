import CategoryService from "../services/category.service.js";

const CategoryController = {
  async addCategory(req, res) {
    return res.fly({
      status: 200,
      message: "Add new category succesfully",
      metadata: await CategoryService.addCategory(req.body),
    });
  },
  async addCategories(req, res) {
    const categories = req.body;
    return res.fly({
      status: 200,
      message: "Add mutiple categories succesfully",
      metadata: await CategoryService.addCategories(categories),
    });
  },
  async getCategoryAttributes(req, res) {
    const categoryId = req.params.categoryId;
    return res.fly({
      status: 200,
      message: "Get category attributes successfully",
      metadata: await CategoryService.getCategoryAttributes(categoryId),
    });
  },
  async getAllCategories(req, res) {
    return res.fly({
      status: 200,
      message: "Get all category successfully",
      metadata: await CategoryService.getAllCategories(),
    });
  },
};

export default CategoryController;
