import { Component } from "react";
import Row from "./Row";

class Greeting extends Component {
  constructor() {
    super();
    this.state = { name: "Mary" };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <section>
        <Row label="Name">
          <input value={this.state.name} onChange={this.handleNameChange} />
        </Row>
      </section>
    );
  }
}

export default Greeting;
