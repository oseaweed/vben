/**
 * @description: Request result set
 */
export enum ResultEnum {
<<<<<<< HEAD
  SUCCESS = 200,
  ERROR = 400,
=======
  SUCCESS = 0,
  ERROR = 1,
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
  TIMEOUT = 401,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
