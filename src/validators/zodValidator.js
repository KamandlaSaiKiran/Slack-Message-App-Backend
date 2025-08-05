// Import HTTP status codes constants (e.g., 400 for Bad Request, 404 for Not Found, etc.)
import { StatusCodes } from 'http-status-codes';

// Import a custom error response formatter from a utility module
import { customErrorResponse } from '../utils/common/responseObjects.js';

/**
 * Middleware factory for validating request bodies using a given schema.
 * @param {Object} schema - The validation schema (e.g., a Zod schema) to be used.
 * @returns {Function} - An Express middleware function.
 */
export const validate = (schema) => {
  // Return the actual middleware function that Express will call
  return async (req, res, next) => {
    try {
      // Attempt to validate the request body against the provided schema asynchronously
      await schema.parseAsync(req.body);

      // If validation passes, move to the next middleware/route handler
      next();
    } catch (error) {
      // Initialize an array to hold detailed error messages for each invalid field
      let explanation = [];

      // Initialize a string to build a combined error message
      let errorMessage = '';

      // Loop through each validation error returned by the schema parser
      error.errors.forEach((key) => {
        // Example: key.path[0] might be "email", key.message might be "is required"
        explanation.push(key.path[0] + ' ' + key.message);

        // Append each error to the errorMessage string
        errorMessage += ' : ' + key.path[0] + ' ' + key.message;
      });

      // Send a 400 Bad Request response with the custom error format
      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: 'Validation error' + errorMessage, // Summary message
          explanation: explanation // Detailed list of field errors
        })
      );
    }
  };
};
