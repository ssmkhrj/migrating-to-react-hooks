import GreetingClass from "./components/Greeting-Class";
import GreetingFunction from "./components/Greeting-Function";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <GreetingClass name="Mary" />
      <GreetingFunction name="Mary" />
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
