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
