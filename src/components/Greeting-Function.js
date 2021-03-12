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
