const route = require("express").Router();
const ContentController = require("../controllers/content.controller");

route.post("/", ContentController.addContent)
route.get("/", ContentController.getAllContent);
route.get("/:id", ContentController.getCategoryContentById);

module.exports = route;