// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.position = "Employee";
    }

    newName() {
        return this.name;
    }

    newID() {
        return this.id;
    }

    newEmail() {
        return this.email;
    }

    newPosition() {
        return this.position;
    }
}

module.exports = Employee;