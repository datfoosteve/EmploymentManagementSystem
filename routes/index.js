const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = mysql.createConnection({
        host: "localhost",
        // MySQL username,
        user: "root",
        // TODO: Add MySQL password here
        password: "",
        database: "corpo_db",
    },
    // @ts-ignore
    console.log(`Connected to the corporate database.`)
);

const questionMain = [{
    type: "list",
    name: "userAnswer",
    message: "Choose One...",
    choices: [
        { name: "Add Employee", value: "addEmployee" },
        {
            name: "Add Department",
            value: "addDepartment",
        },
        {
            name: "Add Role",
            value: "addRole",
        },
        {
            name: "View Roles",
            value: "viewRoles",
        },
        {
            name: "View Departments",
            value: "viewDepartments",
        },
        {
            name: "View Employee",
            value: "viewEmployees"
        },
        {
            name: "Update Employee",
            value: "UpdateEmployees"
        },
        {
            name: "Update Roles",
            value: "viewEmployees"
        },
        {
            name: "Update Roles",
            value: "viewEmployees"
        },
    ]
}]

let mainMenu = async() => {
    const { userAnswer } = await inquirer.prompt(questionMain);
    switch (userAnswer) {
        case "addEmployee":
            addEmployee();
            break;
        case "addDepartment":
            addDepartment();
            break;
        case "addRole":
            addRole();
            break;
        case "viewRoles":
            viewRole();
            break;
        case "viewDepartments":
            viewDepartments();
            break;
        case "viewEmployees":
            viewEmployees();
            break;

    }
};

const addEmployee = async() => {
    const roles = await getRoles();
    const employees = await getEmployees();
    // @ts-ignore
    const choiceRoles = roles.map((role) => ({
        name: role.title,
        value: role.id,
    }));
    // @ts-ignore
    const choiceEmployees = employees.map((employees) => ({
        name: employees.last_name,
        value: employees.id,
    }));
    const userAddEmployee = await inquirer.prompt([{
            type: "input",
            name: "first_name",
            message: "What is the Employees Name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employees last name?",
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is their Manager?",
            choices: choiceEmployees,
        },
        {
            type: "list",
            name: "role_id",
            message: "What is their role?",
            choices: choiceRoles,
        },
    ]);

    // @ts-ignore
    const newEmployee = await db
        .promise()
        .query(" INSERT INTO employee SET?", userAddEmployee);
    console.log("Employee Added!");
    mainMenu();
};

const addDepartment = async() => {
    const debtPrompt = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the department",
    });
    // @ts-ignore
    const newDepartment = await db
        .promise()
        .query(" INSERT INTO department SET?", debtPrompt);
    console.log("Department Added!");
    mainMenu();
};

const addRole = async() => {
    const departments = await getDepartments();
    // @ts-ignore
    const choiceDepartments = departments.map((department) => ({
        name: department.name,
        value: department.id,
    }));
    const rolePrompt = await inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is their Role",
        },
        {
            type: "input",
            name: "salary",
            message: "What is their Salary?",
        },
        {
            type: "list",
            name: "department_id",
            message: "What is their Department?",
            choices: choiceDepartments,
        },
    ]);
    // @ts-ignore
    const newRole = await db
        .promise()
        .query(" INSERT INTO role SET?", rolePrompt);
    console.log("Role Added!");
    mainMenu();
};

const viewRole = async() => {
        const roles = await getRoles()
        console.table(roles);
        mainMenu();
    }
    // @ts-ignore
const viewEmployees = async() => {
    const employees = await getEmployees()
    console.table(employees);
    mainMenu();
}
const viewDepartments = async() => {
    const departments = await getDepartments()
    console.table(departments);
    mainMenu();
}

const getRoles = async() => {
    const roles = await db.promise().query("select * from role");
    return roles[0];
};
const getDepartments = async() => {
    const departments = await db.promise().query("select * from department");
    return departments[0];
};
const getEmployees = async() => {
    const employees = await db.promise().query("select * from employee");
    return employees[0];
};



mainMenu();