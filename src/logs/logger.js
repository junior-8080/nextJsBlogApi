import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "blog-service" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ],
});

// Winston Logger Transports 
/* new winston.transports.File({
 filename: `./src/logs/error.log`,
 level: "error",
}),
new winston.transports.File({
 filename: `./src/logs/http.log`,
 level: "http",
}),
new winston.transports.File({
 filename: `./src/logs/info.log`,
 level: "info",
}),
*/

export default logger;
