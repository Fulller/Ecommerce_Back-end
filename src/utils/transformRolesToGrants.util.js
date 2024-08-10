import _ from "lodash";
const getAllGrants = (role, rolesMap) => {
  let grants = _.cloneDeep(role.rol_grants);
  // Recursively get inherited grants
  (role.rol_inherited || []).forEach((inheritedRole) => {
    const parentRole = rolesMap[inheritedRole];
    if (parentRole) {
      grants = grants.concat(getAllGrants(parentRole, rolesMap));
    }
  });

  return grants;
};
// Transform raw data into the required format
const transformRolesToGrants = (rawData) => {
  const rolesMap = _.keyBy(rawData, "rol_name");

  const grantsObject = {};

  _.forEach(rolesMap, (role, roleName) => {
    const allGrants = getAllGrants(role, rolesMap);

    allGrants.forEach((grant) => {
      const resourceName = grant.resource.src_name;
      const action = `${grant.action}:${grant.possession}`;

      _.set(
        grantsObject,
        [roleName, resourceName, action],
        grant.attribute ? [grant.attribute] : []
      );
    });
  });

  return grantsObject;
};
export default transformRolesToGrants;
