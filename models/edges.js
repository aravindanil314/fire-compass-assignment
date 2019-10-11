module.exports = function() {
  return {
    edges: [
      { data: { source: "cat", target: "bird" } },
      { data: { source: "bird", target: "ladybug" } },
      { data: { source: "bird", target: "grasshopper" } },
      { data: { source: "grasshopper", target: "plant" } },
      { data: { source: "grasshopper", target: "wheat" } },
      { data: { source: "ladybug", target: "aphid" } },
      { data: { source: "aphid", target: "rose" } }
    ]
  };
};
