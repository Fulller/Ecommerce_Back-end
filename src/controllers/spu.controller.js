import SPUService from "../services/spu.service.js";
import _ from "lodash";

const SPUController = {
  async create(req, res) {
    const ownerId = req.user._id;
    const spuData = req.body;
    const spu = await SPUService.newSPU(ownerId, spuData);
    return res.fly({
      status: 201,
      message: "Creat new SPU succesfully",
      metadata: await SPUService.getByShop(spu._id, ownerId),
    });
  },
  async update(req, res) {
    const spuId = req.params.spuId;
    const ownerId = req.user._id;
    const spuQuery = { spu_id: spuId, shop_owner: ownerId };
    const spuData = req.body;
    await SPUService.update(spuQuery, spuData);
    const spu = await SPUService.getByShop(spuId, ownerId);
    return res.fly({
      status: 201,
      message: "Update SPU succesfully",
      metadata: {
        spu,
      },
    });
  },
  async getByShop(req, res) {
    const ownerId = req.user._id;
    const spuId = req.params.spuId;
    return res.fly({
      status: 200,
      message: "Get SPU by shop succesfully",
      metadata: await SPUService.getByShop(spuId, ownerId),
    });
  },
};
export default SPUController;
