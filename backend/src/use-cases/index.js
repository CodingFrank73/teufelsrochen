const { listAllUsers } = require("./users/list-all-users");
const { loginUser } = require("./users/login-user");
const { registerUser } = require("./users/register-user");
const { showUser } = require("./users/show-user");
const { verifyAccount } = require("./users/verify-user-account");

// ----------- customers -------------
const { listAllCustomers } = require("./customers/list-all-customers");
const { registerCustomer } = require("./customers/register-customer");
const { showCustomer } = require("./customers/show-customer");
const { verifyCustomerEmail } = require("./customers/verify-customer-email");

// ----------- products --------------
const { addProduct } = require("./products/add-product");
const { listAllProducts } = require("./products/list-all-products");
const { showProduct } = require("./products/show-product");


const UserService = {
    listAllUsers,
    loginUser,
    registerUser,
    showUser,
    verifyAccount
}

const CustomerService = {
    listAllCustomers,
    registerCustomer,
    showCustomer,
    verifyCustomerEmail
}

const ProductService = {
    addProduct,
    listAllProducts,
    showProduct
}

module.exports = {
    UserService,
    CustomerService,
    ProductService
}