var nodes = require("../models/nodes");
var edges = require("../models/edges");

module.exports = {
  getNodes: id => {
    var allNodes = new nodes().nodes;
    var allEdges = new edges().edges;
    var edgesToShow = [];
    var nodesToShow = [id];
    function nodeFunction(node) {
      if (nodesToShow.includes(node.data.id)) return node;
    }
    function edgeFunction(edge) {
      return edge.data.source === id || edge.data.target === id;
    }
    if (id) {
      edgesToShow = allEdges.filter(edgeFunction);
      edgesToShow.forEach(edge => {
        edge.data.source === id
          ? nodesToShow.push(edge.data.target)
          : nodesToShow.push(edge.data.source);
      });
      return allNodes.filter(nodeFunction);
    } else {
      return allNodes;
    }
  }
};
