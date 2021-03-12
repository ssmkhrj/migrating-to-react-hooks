import { Component, createContext } from "react";

export const LanguageContext = createContext();

export class LanguageProvider extends Component {
  constructor() {
    super();
    this.state = {
      language: "🇺🇸",
    };
  }

  render() {
    return (
      <LanguageContext.Provider value={this.state.language}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
