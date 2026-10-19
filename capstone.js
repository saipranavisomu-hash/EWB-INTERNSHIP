
const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

async function main() {
    console.log("=== INTERACTIVE PRODUCT INVENTORY ===");
    console.log("\n--- Initializing Inventory System ---");

    const inventory = [
        { name: "Laptop", price: 800 },
        { name: "Mouse", price: 25 }
    ];

    // Validate product name
    let productName = "";

    while (true) {
        productName = (
            await rl.question("Enter new product name: ")
        ).trim();

        if (productName === "") {
            console.log("Error: Product name cannot be empty.");
            continue;
        }

        break;
    }

    // Validate product price
    let productPrice;

    while (true) {
        const priceInput = await rl.question(
            "Enter product price: $"
        );

        productPrice = Number(priceInput);

        if (
            priceInput.trim() === "" ||
            !Number.isFinite(productPrice) ||
            productPrice <= 0
        ) {
            console.log(
                "Error: Enter a valid price greater than zero."
            );
            continue;
        }

        break;
    }

    inventory.push({
        name: productName,
        price: productPrice
    });

    console.log(
        `Added successfully: ${productName} ($${productPrice})`
    );

    // Categories using if...else and switch
    function getCategory(price) {
        let categoryCode;

        if (price < 50) {
            categoryCode = 1;
        } else if (price < 200) {
            categoryCode = 2;
        } else {
            categoryCode = 3;
        }

        switch (categoryCode) {
            case 1:
                return "Budget";
            case 2:
                return "Standard";
            case 3:
                return "Premium";
            default:
                return "Unknown";
        }
    }

    // Search inventory
    const searchName = (
        await rl.question("\nEnter product name to search: ")
    ).trim();

    let found = false;

    for (const product of inventory) {
        if (
            product.name.toLowerCase() !==
            searchName.toLowerCase()
        ) {
            continue;
        }

        console.log("\n--- Search Result ---");
        console.log("Product:", product.name);
        console.log("Price:", `$${product.price}`);
        console.log("Category:", getCategory(product.price));

        found = true;
        break;
    }

    if (!found) {
        console.log("Product not found:", searchName);
    }

    // Display inventory
    console.log("\n--- Processing Inventory Roster (forEach) ---");

    inventory.forEach(function (product) {
        console.log(
            `* Item: ${product.name} ($${product.price}) -> Category: ${getCategory(product.price)}`
        );
    });

    // STEP 4: Financial analytics

    // Regular function: calculate total inventory value
    function calculateTotal(products) {
        let total = 0;

        for (const product of products) {
            total += product.price;
        }

        return total;
    }

    // Arrow function: calculate average product price
    const calculateAverage = (products) => {
        if (products.length === 0) {
            return 0;
        }

        return calculateTotal(products) / products.length;
    };

    // Regular function with a default tax rate of 8%
    function calculateTax(amount, taxRate = 8) {
        const tax = amount * taxRate / 100;
        return tax;
    }

    // Arrow function with a default discount of 10%
    const calculateDiscount = (amount, discountRate = 10) => {
        const discount = amount * discountRate / 100;
        return discount;
    };

    // Calculate financial values
    const total = calculateTotal(inventory);
    const average = calculateAverage(inventory);
    const tax = calculateTax(total);
    const discount = calculateDiscount(total);

    // Keep intermediate calculation variables locally scoped
    function getFinancialSummary(amount, taxAmount, discountAmount) {
        const afterTax = amount + taxAmount;
        const afterDiscount = amount - discountAmount;

        return { afterTax, afterDiscount };
    }

    const summary = getFinancialSummary(total, tax, discount);

    // Existing array methods
    const affordableProducts = inventory.filter(
        product => product.price < 200
    );

    const report = inventory.map(
        product => `${product.name.toUpperCase()}: $${product.price}`
    );

    // Display analytics
    console.log("\n--- Financial Analytics ---");
    console.log(`Total Inventory Value: $${total.toFixed(2)}`);
    console.log(`Average Product Price: $${average.toFixed(2)}`);

    console.log(`Tax (8%): $${tax.toFixed(2)}`);
    console.log(`Total Including Tax: $${summary.afterTax.toFixed(2)}`);

    console.log(`Discount (10%): $${discount.toFixed(2)}`);
    console.log(`Total After Discount: $${summary.afterDiscount.toFixed(2)}`);

    console.log(
        "Filtered Affordable Items (Under $200):",
        JSON.stringify(affordableProducts.map(product => product.name))
    );

    console.log("Formatted Report List:", JSON.stringify(report));
}

main()
    .catch(error => {
        console.error("An error occurred:", error.message);
    })
    .finally(() => {
        rl.close();
    });
