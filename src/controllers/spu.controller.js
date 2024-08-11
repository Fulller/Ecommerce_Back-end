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
  async get(req, res) {
    return res.fly({
      status: 200,
      metadata: await SPUService.get(req.params.spu_id),
    });
  },
};
export default SPUController;
