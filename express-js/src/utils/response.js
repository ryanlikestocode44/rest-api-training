// Standarize response
const successResponse = (res, message, data) => {
    res.status(200).json({
        success: true,
        message,
        data,
    });
};

module.exports = {
    successResponse
};