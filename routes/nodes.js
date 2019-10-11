var express = require("express");
var router = express.Router();
var nodeContoller = require("../controllers/nodeController");
var edgeController = require("../controllers/edgeController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  var nodes = nodeContoller.getNodes();
  var edges = edgeController.getEdges();
  res.json([nodes, edges]);
});

router.get("/:id", function(req, res, next) {
  var nodes = nodeContoller.getNodes(req.params.id);
  var edges = edgeController.getEdges(req.params.id);
  res.json([nodes, edges]);
});

module.exports = router;
