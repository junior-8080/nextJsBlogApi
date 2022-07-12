import logger from "../logs/logger.js";

export const success = (res, response) => {
  logger.info({statusCode:response.statusCode,status:response.code,message:response.message})
  const payload = {
    statusCode: 200,
    message: response.message,
    data: response.data,
    status: response.code,
  };
  switch (response.code) {
    case "INVALID_PARAMS":
      payload.statusCode = 400;
      return res.status(400).json(payload);
    case "FORBIDDEN":
      payload.statusCode = 403;
      return res.status(403).status(payload);
    default:
       res.status(200).json(payload);
  }
};

export const serverErrors = (res, error) => {
  logger.error(error)
  const payload = {
    statusCode: 500,
    message: error.message,
    data: error.data,
    status: error.code,
  };
  switch (error.code) {
    case "UNAUTHORIZED":
      payload.statusCode = 401;
      return res.status(401).json(payload);
    case "INVALID_PARAMS":
      payload.statusCode = 401;
      return res.status(401).json(payload);
    case "FORBIDDEN":
      payload.statusCode = 403;
      return res.status(403).status(payload);
    default:
     payload.message = "Kindly contact aahmedltd@mailinator.com for assistance";
      return res.json(500).status(payload);
  }
};
