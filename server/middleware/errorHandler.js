import createError from "http-errors";

export const routeNotFound = (req, res, next) => {
    next(createError(404, "Page not found"));
};

export const globalErrorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({
        statusCode: error.status || 500,
        message: error.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
};