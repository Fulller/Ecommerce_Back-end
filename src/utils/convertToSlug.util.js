import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import otpGenerator from "otp-generator";
import slugify from "slugify";

function generateTailSlug(length = 4) {
  return otpGenerator.generate(length, {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: false,
    specialChars: false,
  });
}
function convertToSlug(text) {
  return slugify(text.replace(/[^\w\s.]/gi, ""), {
    replacement: "_", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
}
function convertToSlugSPUSKU(text) {
  return slugify(text.replace(/[^\w\s.]/gi, ""), {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
}
function spuSlug(spuName) {
  return convertToSlugSPUSKU(`${spuName}.${generateTailSlug()}`);
}
function skuSlug(spuName, spuVariations, skuTierIdx) {
  const variationValues = spuVariations.map((variation, index) => {
    const optionIndex = skuTierIdx[index] || 0;
    return variation.options[optionIndex];
  });
  const variationSlug = variationValues.join(" ");
  return convertToSlugSPUSKU(
    `${spuName}.${variationSlug}.${generateTailSlug()}`
  );
}

export { convertToSlug, spuSlug, skuSlug };
