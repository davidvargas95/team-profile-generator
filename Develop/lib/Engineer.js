// This defines the engineer class and exports it
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.position = "Engineer";
    }
    newGithub() {
        return this.github;
    }
}

module.exports = Engineer;