import winston from "winston";
import path from "path";
import moment from "moment-timezone";

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");

const loggingDir = path.resolve(srcDir, "logging");

// Function to format log entries with timestamp and timezone
const customFormat = winston.format.printf(({ level, message, timestamp}) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Set the desired timezone
const timeZone = "Europe/Paris"; // Central European Time (CET)
// const timeZone = "America/Los_Angeles"; // Pacific Time (PT)
// const timeZone = "America/Chicago"; // Central Time (CT)
// const timeZone = "Asia/Tokyo"; // Japan Standard Time (JST)
// const timeZone = "Asia/Dubai"; // Gulf Standard Time (GST)
// const timeZone = "Australia/Sydney"; // Australian Eastern Time (AET)
// const timeZone = "Africa/Cairo"; // Eastern European Time (EET)
// const timeZone = "Pacific/Auckland"; // New Zealand Time (NZT)
// const timeZone = "America/Sao_Paulo"; // Brasília Time (BRT)
// const timeZone = "Europe/Berlin"; // Central European Time (CET)
// const timeZone = "Asia/Hong_Kong"; // Hong Kong Time (HKT)
// const timeZone = "Asia/Singapore"; // Singapore Time (SGT)

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: () => moment().tz(timeZone).format()}), 
        customFormat
    ),
    transports: [
        new winston.transports.Console({ level: "debug"}),
        new winston.transports.File({
            filename: path.join(loggingDir, "test_run.log"),
            maxFiles: 5, // Number of log files
            maxsize: 10 * 1024, //10 kb, specify the size in bytes
            level: "info",
        }),
        new winston.transports.File({
            filename: path.join(loggingDir, "test_error.log"),
            maxFiles: 5, // Number of log files
            maxsize: 10 * 1024, //10 kb, specify the size in bytes
            level: "error",
        }),
    ],
});


export default logger;