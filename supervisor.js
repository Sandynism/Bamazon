let mysql = require("mysql")
let inq = require("inquirer")
let table = require("console.table")
let colors = require("colors")

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "joiedevivre",
    database: "bamazonDB"
})

connection.connect(function (err) {
    if (err) throw err
    start()
})

function start() {
    console.log("\nWELCOME TO THE SUPERVISORS PORTAL\n".bold.green)
    prompt()
}

function prompt() {
    inq.prompt(
        {
            name: "supervisorMenu",
            type: "rawlist",
            message: "Please select a menu option:",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ).then(function (answer) {
        if (answer.supervisorMenu === "View Product Sales by Department") {
            viewDeptSales()
        } else if (answer.supervisorMenu === "Create New Department") {
            createDept()
        }
    })
}

function viewDeptSales(stock) {
    connection.query(`SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales, ( over_head_costs - product_sales) AS total FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_name;`, function(err, res) {
        if (err) throw err
        console.log("\nDepartment Sales\n".cyan.underline)

        let sales = []
		for (let i = 0; i < stock.length; i++) {
			sales.push([stock[i].department_id, stock[i].department_name, stock[i].over_head_costs, stock[i].product_sales, stock[i].stock_quantity])
		}
		let headings = ["Department ID", "Department", "Overhead Costs", "Total Sold", "Profit"]
		console.table(headings, sales)
    })
}







// let runSup = () => {
//     inquirer.prompt({
//         name: "action",
//         type: "list",
//         message: "What would you like to do?",
//         choices: [
//             "View Product Sales by Department",
//             "Create New Department"
//         ]
//     }).then(function(answer) {
//         switch (answer.action) {
//             case "View Product Sales by Department":
//                 viewDeptSales()
//                 break

//             case "Create New Department":
//                 createDept()
//                 break
//         }
//     });
// }

// /*
// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |
// */

// let viewDeptSales = () => {
//     connection.query(`SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales, ( over_head_costs - product_sales) AS total FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_name;`, function(err, res) {
//         if (err) throw err
//         console.log(`\n   ~ ~ ~  Sales by Department  ~ ~ ~\n`)
//         console.table(res)
//         console.log("---------------------------------------------------------------------\n\n")
//         runSup()
//     })
// }


// let createDept = () => {
//     inquirer.prompt([
//         {
//             name: "name",
//             type: "input",
//             message: "Department Name: ",
//             validate: function(value) {
//                 if (value) {
//                   return true
//                 } else {
//                     return `${value} is not a vaid name`
//                 }
//             }
//         },
//         {
//             name: "cost",
//             type: "input",
//             message: "Over Head Cost: ",
//             validate: function(value) {
//                 if (Number.isNaN(parseInt(value)) === false && value > 0) {
//                     return true
//                 } else {
//                     return `${value} is not a vaid number`
//                 }
//             }
//         }
//     ]).then (function(answers) {
//         console.log(`\n\nNEW Department:\n     Name: ${answers.name}\n     Over Head Cost: ${answers.cost}\n\n`)
//         connection.query(`INSERT INTO departments (department_name, over_head_costs) VALUES ('${answers.name}', ${answers.cost})`, function(err, res) {
//             if (err) throw err
//             runSup()
//         })
//     })
// }


// // RUNNING
// connection.connect(function(err) {
//     if (err) throw err
//     runSup()
// })

