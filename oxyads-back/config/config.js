require("dotenv").config();
module.exports = {
    local: {
        "username": "postgres",
        "password": "tuyendola97",
        "database": "test",
        "host": "localhost",
        "port": 5432,
        "dialect": "postgres",
        "operatorsAliases": false
    },
    development: {
        "username": "root",
        "password": "root",
        "database": "spy2",
        "host": "localhost",
        "dialect": "mysql",
        "port": "8989",
        "logging": false,
        "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
        }
    },
    "test": {
        "username": process.env.MYSQL_USER,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "host": process.env.MYSQL_HOST,
        "port": process.env.MYSQL_PORT,
        "logging": false,
        "dialect": "mysql",
        "port": "3306",
        "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
        }
    },
    "production": {
        "username": process.env.MYSQL_USER,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "host": process.env.MYSQL_HOST,
        "dialect": "mysql",
        "logging": false,
        "port": "3306",
        "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
        }
    },
    "prod": {
        "username": process.env.MYSQL_USER,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "host": process.env.MYSQL_HOST,
        "dialect": "mysql",
        "logging": false,
        "port": "3306",
        "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
        }
    }
};