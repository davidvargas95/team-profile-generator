const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  html.push(...employees
    .filter(employee => employee.newPosition() === "Manager")
    .map(manager => renderManager(manager))
  );
  html.push(...employees
    .filter(employee => employee.newPosition() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(...employees
    .filter(employee => employee.newPosition() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.newName());
  template = replacePlaceholders(template, "role", manager.newPosition());
  template = replacePlaceholders(template, "email", manager.newEmail());
  template = replacePlaceholders(template, "id", manager.newID());
  template = replacePlaceholders(template, "officeNumber", manager.newOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.newName());
  template = replacePlaceholders(template, "role", engineer.newPosition());
  template = replacePlaceholders(template, "email", engineer.newEmail());
  template = replacePlaceholders(template, "id", engineer.newID());
  template = replacePlaceholders(template, "github", engineer.newGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.newName());
  template = replacePlaceholders(template, "role", intern.newPosition());
  template = replacePlaceholders(template, "email", intern.newEmail());
  template = replacePlaceholders(template, "id", intern.newID());
  template = replacePlaceholders(template, "school", intern.newSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
