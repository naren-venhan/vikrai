/**
 * @typedef vikraiErrorType
 *
 */
export const vikraiErrorTypes = {
  /** Errors stemming from the database */
  DB_ERROR: "database_error",
  DUPLICATE_ERROR: "duplicate_error",
  INVALID_ARGUMENT: "invalid_argument",
  INVALID_DATA: "invalid_data",
  UNAUTHORIZED: "unauthorized",
  NOT_FOUND: "not_found",
  NOT_ALLOWED: "not_allowed",
  UNEXPECTED_STATE: "unexpected_state",
  CONFLICT: "conflict",
  UNKNOWN_MODULES: "unknown_modules",
  PAYMENT_AUTHORIZATION_ERROR: "payment_authorization_error",
  PAYMENT_REQUIRES_MORE_ERROR: "payment_requires_more_error",
}

export const vikraiErrorCodes = {
  INSUFFICIENT_INVENTORY: "insufficient_inventory",
  CART_INCOMPATIBLE_STATE: "cart_incompatible_state",
  UNKNOWN_MODULES: "unknown_modules",
}

/**
 * Standardized error to be used across vikrai project.
 * @extends Error
 */
export class vikraiError extends Error {
  __isvikraiError = true

  public type: string
  public message: string
  public code?: string
  public date: Date
  public static Types = vikraiErrorTypes
  public static Codes = vikraiErrorCodes

  /**
   * Creates a standardized error to be used across vikrai project.
   * @param {string} type - type of error
   * @param {string} message - message to go along with error
   * @param {string} code - code of error
   * @param {Array} params - params
   */
  constructor(type: string, message: string, code?: string, ...params: any) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, vikraiError)
    }

    this.type = type
    this.code = code
    this.message = message
    this.date = new Date()
  }

  /**
   * Checks the object for the vikraiError type.
   */
  static isvikraiError(error: any): error is vikraiError {
    return !!error.__isvikraiError
  }
}

