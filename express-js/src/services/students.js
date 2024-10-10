const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request")

const getStudents = (name, nickName, bachelor) => {
    return studentRepository.getStudents(name, nickName, bachelor);
};

const getStudentById = (id) => {
    const student =  studentRepository.getStudentById(id);
    if (!student) {
        throw new NotFoundError("Student Not Found!");
    };

    return student;
};

const addStudent = async (data, file) => {
    //Upload file
    if (file?.profilePicture) {
        data.profilePicture = await imageUpload(file.profilePicture)
    };

    return studentRepository.addStudent(data);
};

const updateStudent = async (id, data, file) => {
    const existingStudentId = studentRepository.getStudentById(id);
    if (!existingStudentId) {
        throw new NotFoundError("Student Not Found");
    };

    /*
    data = {
        ...existingStudentId,
        ...data
    }

    if (file?.profilePicture) {
        const uploadedFile = file.profilePicture;
        data.profilePicture = await imageUpload(uploadedFile);
    }
    */
    if (file && file.profilePicture) {
        const uploadedFile = file.profilePicture;
        data.profilePicture = await imageUpload(uploadedFile);
    } else {
        data.profilePicture = existingStudentId.profilePicture;
    };

    const updatedStudent = studentRepository.updateStudent(id, data, file);
    if (!updatedStudent) {
        throw new InternalServerError(["Failed to update student"]);
    };

    return updatedStudent;
};

const deleteStudentById = (id) => {
    const existingStudentId = studentRepository.getStudentById(id);
    if (!existingStudentId) {
        throw new NotFoundError("Student Not Found");
    };

    const deletedStudent = studentRepository.deleteStudentById(id);
    if (!deletedStudent) {
        throw new InternalServerError(["Failed to delete student"]);
    };

    return deletedStudent;
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudentById
}