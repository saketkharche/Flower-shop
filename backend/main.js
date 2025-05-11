const bcrypt = require("bcryptjs");
bcrypt.hashSync("Saket@15", 10);
console.log(bcrypt.hashSync("Saket@15", 10));
