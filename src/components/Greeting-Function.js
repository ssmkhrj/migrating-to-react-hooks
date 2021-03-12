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
