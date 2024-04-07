const User = require('./model/User')
const Product = require("./model/Product")

exports.options = {
  "components" : {
    "schemas": {
      User,
      Product
    }
  },
  "openapi": "3.1.0",
  "info": {
    "version": "1.0.0",
    "title": "Products CRUD API",
    "description": "Products project application",
    "contact": {
      "name": "API Support",
      "url": "http://www.example.com",
      "email": "support@example.com"
    }
  },
  "servers": [
    {
      url: "http://localhost:3000",
      description: "Local Server"
    },
    {
      url: "http://www.example.com",
      description: "Testing Server"
    }
  ],
  "tags": [
    {
      "name": "Users",
      "description": "API endpoints for users"
    },
    {
      "name": "Products",
      "description": "API endpoints for products"
    }
  ],
  "paths": {
    "/api/users": {
      "get": {
        "tags": ["Users"],
        "description": "Return all users",
        "responses": {
          "200": {
            "description": "A list of users",
            "content": {
              "application/json" : {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": ["Users"],
        "description": "Create new user",
        "requestBody": {
          "description": "User schema to insert",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": {"type" : "string"},
                  "password": {"type" : "string"},
                  "name": {"type" : "string"},
                  "surname": {"type" : "string"},
                  "email": {"type": "string"},
                  "area": {"type" : "string"},
                  "road": {"type" : "string"},
                  "phone": {"type": "string"}
                },
                "required": ["username", "password", "email"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "New user inserted"
          }
        }
      }
    },
    "/api/users/{username}": {
      "get": {
        "tags": ["Users"],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of user that we want to find",
            "type": "string"
          }
        ],
        "description": "Get user with specific username",
        "responses": {
          "200": {
            "description": "User to find",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      },
      "patch": {
        "tags": ["Users"],
        "description": "Update user in app",
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "require": true,
            "description": "Username of the user that we want to update",
            "type": "string"
          }
        ],
        "requestBody": {
          "description": "User that we update",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": {"type": "string"},
                  "name": {"type" : "string"},
                  "surname": {"type" : "string"},
                  "email": {"type": "string"},
                  "area": {"type" : "string"},
                  "road": {"type" : "string"},
                  "phone": {"type": "string"}
                },
                "required": ["email"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Updated user",
            "schema": {
              "$ref": "#/componenets/schemas/User"
            }
          }
        }
      },
      "delete": {
        "tags": ["Users"],
        "description": "Delete a user",
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "description": "User to delete",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "desctiption": "Deleted a user"
          }
        }
      }
    }
  }
}