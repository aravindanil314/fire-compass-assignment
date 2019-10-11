var edges = require("../models/edges");

module.exports = {
  getEdges: id => {
    var allEdges = new edges().edges;
    function edgeFunction(edge) {
      return edge.data.source === id || edge.data.target === id;
    }
    if (id) {
      return allEdges.filter(edgeFunction);
    } else {
      return allEdges;
    }
  }
};
