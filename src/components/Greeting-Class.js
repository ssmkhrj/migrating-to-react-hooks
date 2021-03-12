import { Component } from "react";
import Row from "./Row";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

class Greeting extends Component {
  constructor() {
    super();
    this.state = { name: "Mary", surname: "Poppins" };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
  }

  componentDidMount() {
    document.title = this.state.name + " " + this.state.surname;
  }

  componentDidUpdate() {
    document.title = this.state.name + " " + this.state.surname;
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSurnameChange(e) {
    this.setState({ surname: e.target.value });
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <section className={theme}>
            <Row label="Name">
              <input value={this.state.name} onChange={this.handleNameChange} />
            </Row>
            <Row label="Surname">
              <input
                value={this.state.surname}
                onChange={this.handleSurnameChange}
              />
            </Row>
            <LanguageContext.Consumer>
              {(language) => <Row label="Language">{language}</Row>}
            </LanguageContext.Consumer>
          </section>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Greeting;
