import { StatusCodes } from 'http-status-codes';
// Custom error class for handling validation errors
class ValidationError extends Error {
  /**
   * Constructor for creating a ValidationError instance.
   * @param {Object} errorDetails - The details of the validation errors.
   *        Expected format: { error: { fieldName1: "Error message 1", fieldName2: "Error message 2", ... } }
   * @param {string} message - A general error message describing the validation failure.
   */
  constructor(errorDetails, message) {
    // Call the parent Error class constructor to initialize the message property
    super(message);

    // Set the error name so we can identify this error type easily
    this.name = 'ValidationError';

    // Initialize an array to store all validation error messages
    let explanation = [];

    /**
     * Iterate over each key in the errorDetails.error object
     * and collect all the error messages in the 'explanation' array.
     * Example: { error: { email: "Email is required", password: "Password too short" } }
     * becomes ["Email is required", "Password too short"]
     */
    Object.keys(errorDetails.error).forEach((key) => {
      explanation.push(errorDetails.error[key]);
    });

    // Store the array of error messages for later reference
    this.explanation = explanation;

    // Ensure the message property is explicitly set
    this.message = message;

    /**
     * Set the HTTP status code for this error type.
     * NOTE: There's likely a bug here — `this.statusCode.BADREQUEST` won't work
     * because statusCode is not an object. You might mean:
     * this.statusCode = 400;
     */
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default ValidationError;
