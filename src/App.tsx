import "./App.css";
import DatePicker from "./DatePicker";

function App() {
  return (
    <section id="center">
      <DatePicker
        width={600}
        idInput="firstInput"
        showAdjacentMonths={false}
        label="Введите дату презентации"
      />
    </section>
  );
}

export default App;
