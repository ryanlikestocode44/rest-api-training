const studentService = require("../services/students");
const { successResponse } = require("../utils/response");

const getStudents = (req, res, next) => {
    // Call the usecase or service
    const data = studentService.getStudents(
        req.query?.name,
        req.query?.nickName,
        req.query?.bachelor
    );

    successResponse(res,"Success Get All Students Data", data);
};

const getStudentById = (req, res, next) => {
    const { id } = req.params;
    const data = studentService.getStudentById(id);
    successResponse(res, "Success Get Student Data", data);
};

const addStudent = async (req, res, next) => {
    // Convert to student data format
    const requestBody = {
        ...req.body,
        address: {
            province: req.body["address.province"],
            city: req.body["address.city"],
        },
        education: {
            bachelor: req.body["education.bachelor"],
        },
    };
    delete requestBody["address.province"];
    delete requestBody["address.city"];
    delete requestBody["education.bachelor"];

    // Create the new student
    const data = await studentService.addStudent(requestBody, req.files);
    successResponse(res, data);
};

const updateStudent = async (req, res, next) => {
    const { id } = req.params;

    // Convert to student data format
    const requestBody = {
        ...req.body,
        address: {
            province: req.body["address.province"],
            city: req.body["address.city"],
        },
        education: {
            bachelor: req.body["education.bachelor"]
        }
    };

    delete requestBody["address.province"];
    delete requestBody["address.city"];
    delete requestBody["education.bachelor"];

    const data = await studentService.updateStudent(id, requestBody, req.files);
    successResponse(res, "Success Update Student Data", data);
}

const deleteStudentById = (req, res, next) => {
    const { id } = req.params;
    const data = studentService.deleteStudentById(id);
    successResponse(res,"Success Delete Student Data", data);
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudentById
}