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

Suppose we have a `ThemeContext` and a `LanguageContext` that we want to use in our `Greeting` component. In class components we can do so by using the **Render Props API**

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

# Lifecycle Methods

If we want to perform side effects in React we can do so using the lifecycle methods. So, suppose we want to update the title of the document as the state changes we can make use of `componentDidMount` and `componentDidUpdate` lifecycle methods.

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
```

<image src="./readme-imgs/5.gif">

We can perform side effects in functional components using the `useEffect` hook. By default `useEffect` runs both after the initial render and after every update but we can opt out of this behavior.

```js
import { useState, useContext, useEffect } from "react";
import Row from "./Row";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

const Greeting = () => {
  const [name, setName] = useState("Mary");
  const [surname, setSurname] = useState("Poppins");

  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  useEffect(() => {
    document.title = name + " " + surname;
  });

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

<image src="./readme-imgs/5.gif">

We can also subscribe to Browser APIs using lifecycle methods. So, suppose we want to have a state that stores the window width and subscribe to a Browser API that listens for changes in the window width and then we update the state based on these changes.

```js
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
```

<image src="./readme-imgs/6.gif">

Since listening to the window width has nothing to do with setting the document title we will not put them together in the same `useEffect` hook. So, just like `useState` hook we can have multiple `useEffect` hooks.

With hooks the code is separated not based on lifecycle methods but based on the logic behind the code.

```js
import { useState, useContext, useEffect } from "react";
import Row from "./Row";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

const Greeting = () => {
  const [name, setName] = useState("Mary");
  const [surname, setSurname] = useState("Poppins");
  const [width, setWidth] = useState(window.innerWidth);

  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  useEffect(() => {
    document.title = name + " " + surname;
  });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

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
      <Row label="Width">{width}</Row>
    </section>
  );
};

export default Greeting;
```

**NOTE:** Currently we constantly subscribe and unsubscribe as the state changes. We can add an empty dependency array to only subscribe and unsubcribe once. `useEffect(() => {//code}, [])`

<image src="./readme-imgs/6.gif">
