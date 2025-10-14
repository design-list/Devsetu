// src/helper/validateFields.js

/**
 * Validate all required fields in an array of objects.
 * 
 * @param {Array} data - Array of objects to validate
 * @param {Array} requiredFields - List of required keys (strings)
 * @returns {Object} result - { isValid: boolean, errors: Array }
 */
export const validateFields = (data, requiredFields = []) => {
  const errors = data.map((item) => {
    const fieldErrors = {};
    requiredFields.forEach((field) => {
      if (!item[field] || item[field].toString().trim() === "") {
        fieldErrors[field] = true;
      } else {
        fieldErrors[field] = false;
      }
    });
    return fieldErrors;
  });

  const isValid = errors.every((err) =>
    Object.values(err).every((v) => v === false)
  );

  return { isValid, errors };
};
