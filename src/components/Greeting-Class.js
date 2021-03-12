import { Component } from "react";
import Row from "./Row";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

class Greeting extends Component {
  constructor() {
    super();
    this.state = { name: "Mary", surname: "Poppins", width: window.innerWidth };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    document.title = this.state.name + " " + this.state.surname;

    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate() {
    document.title = this.state.name + " " + this.state.surname;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize(e) {
    this.setState({
      width: window.innerWidth,
    });
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
            <Row label="Width">{this.state.width}</Row>
          </section>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Greeting;
