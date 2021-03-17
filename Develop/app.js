const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];


// This variable lays the ground work for questions asked of each new position

const generalQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter the name of this employee."
    },
    {
        type: "input",
        name: "id",
        message: "What is this employee's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is this employee's email?"
    },
    {
        type: "input",
        name: "position",
        message: "What is this employee's name?"
    },
];


//Function to start inquirer to determine which position we are generating
employeePosition();

function employeePosition() {

    inquirer.prompt({
        message: "Employee's position?",
        name:"position",
        type:"list",
        choices: ["Engineer", "Intern", "Manager"]

    }).then((response) => {
        if (response.position === "Engineer") {
            engineerPosition()
        } else if (response.position === "Intern") {
            internPosition();
        } else if (response.position === "Manager") {
            managerPosition();
        }
    });

    // Engineer questions
    function engineerPosition() {

        inquirer.prompt([
            ...generalQuestions,
            {
                type:"input",
                message: "What is their github username?",
                name: "github"
            }
        ])
        .then(({name, id, email, github}) => {
            employeeList.push(new Engineer(name, id, email, github));
            newEmployee();
        })
    }

    // Intern questions
    function internPosition() {

        inquirer.prompt([
            ...generalQuestions,
            {
                type:"input",
                message:"What school are they going to?",
                name: "school"
            }
        ])
        .then(({name, id, email, school}) => {
            employeeList.push(new Intern(name, id, email, school));
            newEmployee();
        })
    }

    // Manager questions
    function managerPosition() {

        inquirer.prompt([
            ...generalQuestions,
            {
                type:"input",
                message: "What is their office number?",
                name: "office"
            }
        ])
        .then(({name, id, email, office}) => {
            employeeList.push(new Manager(name, id, email, office));
            newEmployee();
        })
    }
    
    // Function that asks to add another position
    function newEmployee() {
        inquirer.prompt({
            message: "Will you add another member?",
            name: "another",
            type: "list",
            choices: [
                "yes",
                "no"
            ],
        }).then(({another}) => {
            if (another === "yes") {
                employeePosition();
            } else {
                console.log("Profiles successfully generated");
                console.log(employeeList);
                createFile();
            }
            
        })
        }
    }

    // Runs the file generation process
    function createFile() {
        const html = render(employeeList);
        if (! fs.existsSync(OUTPUT_DIR))
        fs.mkdirSync(OUTPUT_DIR);

        fs.writeFile(outputPath, html, (error) => {
            if (error) console.log(error);
            else console.log("Page created");
        });
    }