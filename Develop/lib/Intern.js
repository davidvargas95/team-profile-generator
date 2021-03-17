// This defines the intern class and exports it
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.position = "Intern";
    }
    newSchool() {
        return this.school;
    }
}

module.exports = Intern;