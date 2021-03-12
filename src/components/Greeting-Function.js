import { useState, useContext, useEffect } from "react";
import Row from "./Row";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

const Greeting = () => {
  const name = useFormInput("Mary");
  const surname = useFormInput("Poppins");
  const width = useWindowWidth();

  useDocumentTitle(name.value + " " + surname.value);

  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  return (
    <section className={theme}>
      <Row label="Name">
        <input {...name} />
      </Row>
      <Row label="Surname">
        <input {...surname} />
      </Row>
      <Row label="Language">{language}</Row>
      <Row label="Width">{width}</Row>
    </section>
  );
};

export default Greeting;

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return width;
};

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  });
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => setValue(e.target.value);

  return {
    value,
    onChange: handleChange,
  };
};
