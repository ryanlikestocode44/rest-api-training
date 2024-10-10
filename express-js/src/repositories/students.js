const students = require("../../data/students.json");
const fs = require("fs");
const { NotFoundError } = require("../utils/request")

const getStudents = (name, nickName, bachelor) => {
    const searchedStudent = students.filter((student) => {
        // Do filter logic here
        let result = true;
        if (name) {
            const isFoundName = student.name
                .toLowerCase()
                .includes(name.toLowerCase());
            result = result && isFoundName;
        }
        if (nickName) {
            const isFoundNickName = student.nickName
                .toLowerCase()
                .includes(nickName.toLowerCase());
            result = result && isFoundNickName;
        }
        if (bachelor) {
            const isFoundBachelor = student.education.bachelor
                .toLowerCase()
                .includes(bachelor.toLowerCase());
            result = result && isFoundBachelor;
        }

        return result;
    });
    return searchedStudent;
};

const getStudentById = (id) => {
    // find student by id
    const student = students.find((student) => student.id == id);
    return student;
};

const addStudent = (data) => {
    // Find the max index to defnine the new data id
    const maxId = students.reduce(
        (max, student) => student.id > max && student.id,
        0
    );

    // let max = 0;
    // for (let index = 0; index < students.length; index++) {
    //     if (students[index].id > max) {
    //         max = students[index].id;
    //     }
    // }
    // let max = 0;
    // students.map((student) => {
    //     if (student.id > max) {
    //         max = student.id;
    //     }
    // });
    
    
    const newStudent = {
        id: maxId + 1,
        ...data,
    };

    /* Add data to current array students */
    students.push(newStudent);

    // Save the latest data to json
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 4),
        "utf-8"
    );

    return newStudent;
};

const updateStudent = (id, data) => {
    // Find the existing student data
    const student = students.find((student) => student.id === Number(id));
    if (!student) {
        // Make a error class
        throw new NotFoundError("Student is Not Found!");
    }

    // Update the data
    Object.assign(student, data);

    // Update the json data
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 4),
        "utf-8"
    );

    return student;
};

const deleteStudentById = (id) => {
    // Find index
    const studentIndex = students.findIndex((student) => student.id == id);

    if (studentIndex < 0) {
        // If no index found
        return null;
    }

    // If the index found
    const deletedStudent = students.splice(studentIndex, 1);

    // Update the json
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 4),
        "utf-8"
    );

    return deletedStudent;
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudentById
}
