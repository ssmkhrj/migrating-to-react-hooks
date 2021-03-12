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
