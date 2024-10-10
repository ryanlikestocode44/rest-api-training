const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetStudents = (req, res, next) => {
    // Validate the query
    const validateQuery = z.object({
        name: z.string().optional(),
        nickName: z.string().optional(),
        bachelor: z.string().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
};

const validateGetStudentById = (req, res, next) => {
    // Make a validation schema
    const validateId = z.object({
        id: z.string(),
    });

    const result = validateId.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    };

    next()
};

const validateAddStudent = (req, res, next) => {
     // Validation body schema
     const validateBody = z.object({
        name: z.string(),
        nickName: z.string(),
        class: z.string(),
        "address.city": z.string(),
        "address.province": z.string(),
        "education.bachelor": z.string().optional().nullable()
    });

    // The file is not required
    const validateFileBody = z.object({
        profilePicture: z.object({
            name: z.string(),
            data: z.any(),
        }).nullable().optional(),
    }).nullable().optional();

    // Validate
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    // Validate
    const resultValidateFiles = validateFileBody.safeParse(req.files);
    if (!resultValidateFiles.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateFiles.error.errors);
    }

    next();
}

const validateUpdateStudent = (req, res, next) => {
    // zod validation
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    // Validation body schema
    const validateBody = z.object({
        name: z.string(),
        nickName: z.string(),
        class: z.string(),
        "address.city": z.string(),
        "address.province": z.string(),
        "education.bachelor": z.string().optional().nullable()
    });

    const validateFileBody = z.object({
        profilePicture: z.object({
            name: z.string(),
            data: z.any()
        }).nullable().optional()
    }).nullable().optional();

    // Validate Body
    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateBody.error.errors);
    };

    // Validate File
    const resultValidateFile = validateFileBody.safeParse(req.files);
    if (!resultValidateFile.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateFile.error.errors);
    }

    next();
};

const validateDeleteStudentById = (req, res, next) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    };

    next();
}

module.exports = {
    validateGetStudents,
    validateGetStudentById,
    validateAddStudent,
    validateUpdateStudent,
    validateDeleteStudentById
}
