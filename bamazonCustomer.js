// required node modules
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Futurpilot09",
    database: "bamazon"
});

connection.connect(function (err) {
    showproducts();
});

function showproducts() {
    const availProds = connection.query('SELECT * FROM `products`', function (err, results) {
        const items = availProds._results[0];
        
        console.log('\n Available Items: \n');
        for (let i = 0; i < items.length; i++) {
            console.log(items[i].product_name + ': ' + items[i].price);
        }
        console.log('\n ------------- \n');
        runInterface();
    });
}


function runInterface() {

    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Which product would you like to buy? "
            },
            {
                name: "amount",
                type: "input",
                message: "Enter quantity: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            const available = connection.query('SELECT * FROM `products` WHERE product_name = ?', [answer.name], function (err, results) {
                const stock = available._results[0][0].stock_quantity;
                const itemID = available._results[0][0].item_id;
                const updateAmount = stock - answer.amount;
                const total = answer.amount * available._results[0][0].price;

                if (stock == 'undefined') {
                    console.log('Please select an item from the available list!');
                    showproducts();
                }

                if (stock > answer.amount) {
                    connection.query('UPDATE `products` SET `stock_quantity` = ? WHERE `item_id` = ?', [updateAmount, itemID], function (err, results) {

                        console.log('Transaction Total: ' + total);
                        console.log('New Quantity Available: ' + updateAmount);
                        connection.end();
                    });
                } else {
                    console.log('Insuffcient Quantity \n');
                    console.log("Available Stock: " + stock + "\n");
                    console.log("Please try again");
                    runInterface();

                }
            });
        });
}

