import React, { Component } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import Button from "react-bootstrap/Button";

export default class Cytoscape extends Component {
  state = {
    w: 0,
    h: 0,
    elements: [],
    history: [],
    style: []
  };

  componentDidMount = () => {
    this.setState({
      w: "100vw",
      h: "90vh"
    });
    fetch("/nodes")
      .then(res => res.json())
      .then(elements => {
        this.setState({ elements: elements[0].concat(elements[1]) });
        this.setState({ history: [] });
        var layout = this.cy.layout({
          name: "breadthfirst",
          directed: true,
          fit: true,
          avoidOverlap: true
        });
        layout.run();
      });
    this.setUpListeners();
  };

  setUpListeners = () => {
    this.cy.on("click", "node", event => {
      fetch("/nodes/" + event.target.data().id)
        .then(res => res.json())
        .then(elements => {
          let elementsToIncrement = elements[0].concat(elements[1]);
          this.setState({
            history: Array.from(
              new Set(
                this.state.history
                  .concat(elementsToIncrement)
                  .map(JSON.stringify)
              )
            ).map(JSON.parse)
          });
          this.setState({ elements: this.state.history });
          var layout = this.cy.layout({
            name: "breadthfirst",
            directed: true,
            fit: true,
            avoidOverlap: true
          });
          layout.run();
        });
    });
  };

  resetFunction = () => {
    fetch("/nodes/")
      .then(res => res.json())
      .then(elements => {
        this.setState({ elements: elements[0].concat(elements[1]) });
        this.setState({ history: [] });
        var layout = this.cy.layout({
          name: "breadthfirst",
          directed: true,
          fit: true,
          avoidOverlap: true
        });
        layout.run();
      });
  };

  render() {
    return (
      <div className="container">
        <CytoscapeComponent
          className="container mt-2 border border-dark bg-white"
          elements={this.state.elements}
          style={{ width: this.state.w, height: this.state.h }}
          cy={cy => {
            this.cy = cy;
          }}
        />
        <div className="d-flex mt-2 justify-content-center">
          <Button variant="primary" onClick={this.resetFunction}>
            Reset
          </Button>
        </div>
      </div>
    );
  }
}
