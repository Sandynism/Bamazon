let mysql = require("mysql")
let inq = require("inquirer")
let table = require("console.table")
let colors = require("colors")

let connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "",
	database: "bamazonDB"
})

connection.connect(function(err) {
	if (err) throw err
	start()
})

function start() {
	console.log("\nWELCOME TO THE MANAGERS PORTAL\n".bold.green)
	prompt()
}

function prompt() {
	inq.prompt(
		{
			name: "managerMenu",
			type: "rawlist",
			message: "Please select a menu option:",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
		}
	).then(function(answer) {
		if (answer.managerMenu === "View Products for Sale") {
			showItems()
		} else if (answer.managerMenu === "View Low Inventory") {
			lowInv()
		} else if (answer.managerMenu === "Add to Inventory") {
			addInv()
		} else if (answer.managerMenu === "Add New Product") {
			newProduct()
		} else if (answer.managerMenu === "Exit") {
			exit()
		}
	})
}

function printTable(stock) {
	let items = []
	let headings = ["Item ID", "Product", "Department", "Price ($)", "Quantity Available"]

	for (let i = 0; i < stock.length; i++) {
		items.push([stock[i].item_id, stock[i].product_name, stock[i].department_name, stock[i].price, stock[i].stock_quantity])
	}
	console.table(headings, items)
}

// function that makes a sql query to display all products to the manager.
function showItems() {
	connection.query("SELECT * FROM products", function(err, stock) {
		if (err) throw err
		console.log("\nAll Products\n".cyan.underline)
		// console.log(stock)
		printTable(stock)
		setTimeout(menu, 1000)
	})
}

function menu() {
	inq.prompt(
		{
			name: "menu",
			type: "confirm",
			message: "Would you like to view the menu?"
		}
	).then(function(answer) {
		if (answer.menu) {
			prompt()
		} else {
			exit()
		}
	})
}

// function that makes a sql query to display low inventory items to the manager.
function lowInv() {
	connection.query("SELECT * FROM products WHERE stock_quantity < 15", function(err, stock) {
		if (err) throw err
		if (stock.length === 0) {
			console.log("\nThere are no items low in stock.\n".cyan)
		} else {
			console.log("\nLow Inventory\n".cyan.underline)
			printTable(stock)
			setTimeout(menu, 1000)
		}
	})
}

// function that makes a sql query to add additional inventory to the database
function addInv() {
	let selected

	inq.prompt([
		{
			name: "itemID",
			type: "input",
			message: "Please enter the ID number of the item you'd like to update.",
			validate: function(value) {
				if (value <= 0 || isNaN(value)) {
					console.log("\nPlease enter a valid item ID.\n".red)
				} else {
					return true
				}
			}
		},
		{
			name: "quantity",
			type: "input",
			message: "How many units of this item would you like to add?",
			validate: function(value) {
				if (value <= 0 || isNaN(value)) {
					console.log("\nPlease enter a valid number.\n".red)
				} else {
					return true
				}
			}
		}
	]).then(function(answer) {
		connection.query("SELECT * FROM products WHERE item_id = ?",[answer.itemID], function(err, stock) {
			if (err) throw err
			selected = stock[0] 
		})

		connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [answer.quantity, answer.itemID], function(err, stock) {
			if (err) throw err
			console.log("\nThe " + answer.itemID + " has been successfully updated!\n".magenta)

			inq.prompt(
				{
					name: "addAnother",
					type: "confirm",
					message: "Would you like to update another item?"
				}
			).then(function(answer) {
				if (answer.addAnother) {
					addInv()
				} else {
					menu()
				}
			})
		})
	})
}

// function that makes a sql query to add a new product to the database.
function newProduct() {
	inq.prompt([
		{
			name: "name",
			type: "input",
			message: "Please enter the product name:"
		},
		{
			name: "dept",
			type: "input",
			message: "Please enter the department name:"
		},
		{
			name: "price",
			type: "input",
			message: "Please enter the product's price:"
		},
		{
			name: "quantity",
			type: "input",
			message: "Please enter the quantity of the product:"
		}
	]).then(function(answer) {
		connection.query("INSERT INTO products SET ?",
		{
			product_name: answer.name,
			department_name: answer.dept,
			price: answer.price,
			stock_quantity: answer.quantity
		},
		function(err, stock) {
			if (err) throw err
			let message = "\n" + answer.name + " was successfully added to the inventory!\n"
			console.log(message.magenta)
			menu()
		})
	})
}


function exit() {
	console.log("\nManager Session Ended.\n".bold.cyan)
	connection.end()
}
