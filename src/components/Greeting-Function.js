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
