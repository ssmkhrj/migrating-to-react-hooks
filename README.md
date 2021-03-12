# Adding Stateful Logic

So, we have this `Greeting` component, that simply displays a name. It is currently a functional component because we don't need any state in it.

```js
import Row from "./Row";

const Greeting = ({ name }) => (
  <section>
    <Row label="Name">{name}</Row>
  </section>
);

export default Greeting;
```

<image src="./readme-imgs/1.png">

Suppose we want the `name` to be editable, for this we need to add some state into our component, so we need to convert it into a class component.

```js
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
```

<image src="./readme-imgs/2.gif">

Using the `useState` hook we can now make our functional components stateful.

```js
import { useState } from "react";
import Row from "./Row";

const Greeting = () => {
  const [name, setName] = useState("Mary");

  const handleNameChange = (e) => setName(e.target.value);

  return (
    <section>
      <Row label="Name">
        <input value={name} onChange={handleNameChange} />
      </Row>
    </section>
  );
};

export default Greeting;
```

<image src="./readme-imgs/2.gif">

# Multiple `useState` Hook

Now, suppose we want to add another property to our state that will hold the `surname`. We can do this by adding another property to our state object in the class component.

```js
import { Component } from "react";
import Row from "./Row";

class Greeting extends Component {
  constructor() {
    super();
    this.state = { name: "Mary", surname: "Poppins" };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSurnameChange(e) {
    this.setState({ surname: e.target.value });
  }

  render() {
    return (
      <section>
        <Row label="Name">
          <input value={this.state.name} onChange={this.handleNameChange} />
        </Row>
        <Row label="Surname">
          <input
            value={this.state.surname}
            onChange={this.handleSurnameChange}
          />
        </Row>
      </section>
    );
  }
}

export default Greeting;
```

<image src="./readme-imgs/3.gif">

In functional components we can have multiple `useState` hooks. So, we will create a separate `useState` hook for `surname`

```js
import { useState } from "react";
import Row from "./Row";

const Greeting = () => {
  const [name, setName] = useState("Mary");
  const [surname, setSurname] = useState("Poppins");

  const handleNameChange = (e) => setName(e.target.value);

  const handleSurnameChange = (e) => setSurname(e.target.value);

  return (
    <section>
      <Row label="Name">
        <input value={name} onChange={handleNameChange} />
      </Row>
      <Row label="Surname">
        <input value={surname} onChange={handleSurnameChange} />
      </Row>
    </section>
  );
};

export default Greeting;
```

<image src="./readme-imgs/3.gif">

# Consuming Contexts

Suppose we have a `ThemeContext` and a `LanguageContext` that we to use in our `Greeting` component. In class components we can do so by using the **Render Props API**

```js
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
```

<image src="./readme-imgs/4.png">

We can consume contexts in functional components using the `useContext` hook.

```js
import { useState, useContext } from "react";
import Row from "./Row";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

const Greeting = () => {
  const [name, setName] = useState("Mary");
  const [surname, setSurname] = useState("Poppins");

  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  const handleNameChange = (e) => setName(e.target.value);

  const handleSurnameChange = (e) => setSurname(e.target.value);

  return (
    <section className={theme}>
      <Row label="Name">
        <input value={name} onChange={handleNameChange} />
      </Row>
      <Row label="Surname">
        <input value={surname} onChange={handleSurnameChange} />
      </Row>
      <Row label="Language">{language}</Row>
    </section>
  );
};

export default Greeting;
```

<image src="./readme-imgs/4.png">
