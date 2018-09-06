let mysql = require("mysql")
let inq = require("inquirer")
let table = require("console.table")
let colors = require("colors")
let itemID = 0
let itemQuantity = 0
let selected
let statement

// creates the connection to the sql database.
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

//starts the node store and provides user options.
function start() {
	console.log("\nWELCOME TO THE BAMAZON STORE!\n".bold.green)
	inq.prompt(
		{
			name: "browse",
			type: "confirm",
			message: "Would you like to browse the available products?"
		}
	).then(function(answer) {
		if (answer.browse) {
			showItems()
			setTimeout(promptUser, 1000)
		} else {
			exit()
		}
	})
}

// function that makes a sql query to display all products to the user.
function showItems() {
	connection.query("SELECT * FROM products", function(err, stock) {
		if (err) throw err
		console.log("\nAll Products\n".cyan.underline)
		// console.log(stock)
		let products = []
		for (let i = 0; i < stock.length; i++) {
			products.push([stock[i].item_id, stock[i].product_name, stock[i].department_name, stock[i].price, stock[i].stock_quantity])
		}
		let headings = ["Item ID", "Product", "Department", "Price ($)", "Quantity Available"]
		console.table(headings, products)
	})
}

// function that prompts the user purchase.
function promptUser() {
	inq.prompt([
		{
			name: "id",
			type: "input",
			message: "Please enter the ID number of the item you'd like to purchase.",
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
			message: "Please enter the quantity of the item you'd like to purchase.",
			validate: function(value) {
				if (isNaN(value)) {
					console.log("\nPlease enter a valid number.\n".red)
				} else {
					return true
				}
			}
		}
	]).then(function(answer) {
		itemID = answer.id
		itemQuantity = answer.quantity

		connection.query("SELECT * FROM products WHERE item_id=" + itemID, function(err, stock) {
			selected = stock[0]

			if (itemQuantity > selected.stock_quantity && selected.stock_quantity > 1) {
				statement = "\nSorry, we only have " + selected.stock_quantity + " " + selected.product_name + "s available.\n"
				console.log(statement.red)
				promptUser()
			} else if (itemQuantity > selected.stock_quantity && selected.stock_quantity === 1) {
				statement = "\nSorry, we only have 1 " + selected.product_name + " available.\n"
				console.log(statement.red)
				promptUser()
			} else if (itemQuantity > selected.stock_quantity && selected.stock_quantity < 1) {
				statement = "\nSorry, " + selected.product_name + " is out of stock.\n"
				console.log(statement.red)
				promptUser()
			} else if (+itemQuantity === 1) {
                statement = "\nYou are purchasing 1 " + selected.product_name + "."
				buyProduct()
			} else {
                statement = "\nYou are purchasing " + itemQuantity + " " + selected.product_name + "s."
				buyProduct()
			}
		})
	})
}

function buyProduct() {
	inq.prompt(
		{
			name: "buy",
			type: "confirm",
			message: statement + " Would you like to check out?"
		}
	).then(function(answer) {
		if (answer.buy) {
			connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [itemQuantity, itemID], function(err, stock) {
				if (err) throw err
				let totalStatement = "\nOrder confirmed. Your total is $" + (itemQuantity * selected.price) + "\n"
				console.log(totalStatement.cyan)
				setTimeout(buyDifferent, 1500)
			})
		} else {
			buyDifferent()
		}
	})
}

function buyDifferent() {
	inq.prompt(
		{
			name: "differentItem",
			type: "confirm",
			message: "Would you like to purchase a different item?"
		}
	).then(function(answer) {
		if (answer.differentItem) {
			showItems()
			setTimeout(promptUser, 1000)
		} else {
			exit()
		}
	})
}

function exit() {
	console.log("\nThank you for visiting Bamazon! Have a great day!\n".bold.cyan)
	connection.end()
}