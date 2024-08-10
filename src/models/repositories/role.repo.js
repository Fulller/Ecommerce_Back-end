import Role from "../role.model.js";
import { ROLE_SCHEMA_CONST } from "../../configs/schema.const.config.js";
import createHttpError from "http-errors";

const RoleRepository = {
  async findRoleIdByName(name = ROLE_SCHEMA_CONST.NAME.USER) {
    const role = await Role.findOne({ rol_name: name }).lean();
    if (!role) {
      throw createHttpError(404, "Role name not found");
    }
    return role._id;
  },
};

export default RoleRepository;
