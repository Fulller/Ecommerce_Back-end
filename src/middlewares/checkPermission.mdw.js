import { getAccessControl } from "../configs/accesscontrol.config.js";
import { ROLE_SCHEMA_CONST } from "../configs/schema.const.config.js";
import createHttpError from "http-errors";
import _ from "lodash";

function checkPermission({ action, resource, possession = "any" }) {
  return async function (req, res, next) {
    try {
      const GUEST_ROLE = ROLE_SCHEMA_CONST.NAME.GUEST;
      const userRole = _.get(req, "user.usr_role.rol_name", GUEST_ROLE);
      const permission = (await getAccessControl()).permission({
        role: userRole,
        action: action,
        resource: resource,
        possession: possession,
      });
      if (permission.granted) {
        next();
      } else {
        throw createHttpError(403, "Check permission :: invalid");
      }
    } catch (error) {
      next(error);
    }
  };
}
export default checkPermission;
