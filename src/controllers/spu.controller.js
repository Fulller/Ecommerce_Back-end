import SPUService from "../services/spu.service.js";
import _ from "lodash";

const SPUController = {
  async createNew(req, res) {
    const ownerId = req.user._id;
    const spuData = req.body;
    const [spu, skuList] = await SPUService.newSPU(spuData, ownerId);
    return res.fly({
      status: 201,
      metadata: {
        spu,
        skuList,
      },
    });
  },
  async getByShop(req, res) {
    const ownerId = req.user._id;
    const spuId = req.params.spuId;
    return res.fly({
      status: 200,
      metadata: await SPUService.getByShop(spuId, ownerId),
    });
  },
};
export default SPUController;
