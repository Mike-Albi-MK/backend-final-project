import createError from "http-errors";

export const routeNotFound = () => {
    throw createError(404, "Page not found");
};

export const globalErrorHandler = (error, res, req, next) => {
    res.status(error.status || 500).json({
        statusCode: error.status,
        message: error.message,
        stack: error.stack,
    });
};