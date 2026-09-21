import "./App.css";
import DatePicker from "./DatePicker";

function App() {
  return (
    <section id="center">
      <DatePicker width={608} label="Билет туда" />
      <div className="oneRow">
        <DatePicker width={300} label="Дата начала выставки" />
        <DatePicker width={300} label="Дата окончания выставки" />
      </div>
      <DatePicker width={608} label="Билет обратно" />
    </section>
  );
}

export default App;
