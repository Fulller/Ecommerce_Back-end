import _ from "lodash";

function getCleanData(data) {
  if (!_.isObject(data) && !_.isArray(data)) {
    throw new Error("Invalid data type: Expected an object or array.");
  }
  const omitArray = ["createdAt", "updatedAt", "__v"];
  const isArray = _.isArray(data);
  if (isArray) {
    return _.map(data, (item) => _.omit(item.toObject(), omitArray));
  }
  return _.omit(data.toObject(), omitArray);
}

export { getCleanData };
