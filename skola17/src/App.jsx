import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [dark, setDark] = useState(false); // start in light mode
  const [value, setValue] = useState("ALL");
  const [array, setArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [nextId, setNextId] = useState(0);
console.log("master")
  function ChangeTheme() {
    setDark((prev) => !prev);
  }

  function ChangeMark(itemId) {
    setArray((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, marked: !item.marked } : item
      )
    );
  }

  function NewItem(event) {
    if (event.key === "Enter" && event.target.value) {
      setArray((prev) => [
        ...prev,
        { id: nextId, text: event.target.value, marked: false },
      ]);
      setNextId((prev) => prev + 1);
      event.target.value;
    }
  }

  useEffect(() => {
    const filtered = array.filter((item) => {
      if (value === "ALL") return true;
      if (value === "COMPLETED") return item.marked === true;
      if (value === "INCOMPLETED") return item.marked === false;
      return true;
    });
    setFilteredArray(filtered);
  }, [value, array]);

  return (
    <main className={dark ? "mainClassDark" : "mainClass"}>
      <h1 className={dark ? "headerDark" : "header"}>TODO LIST</h1>

      <div className="box">
        <input
          onKeyDown={NewItem}
          placeholder="Add note..."
          className="inputClass"
        />
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="selectClass"
        >
          <option value="ALL">All</option>
          <option value="COMPLETED">Completed</option>
          <option value="INCOMPLETED">Incomplete</option>
        </select>
        <button onClick={ChangeTheme} className="buttonClass">
          <img src={dark ? "Sun.svg" : "Moon.svg"} alt="theme icon" />
        </button>
      </div>

      <div className="box2">
        {filteredArray.map((item) => (
          <div key={item.id} className="itemDiv">
            <div
              onClick={() => ChangeMark(item.id)}
              className={item.marked ? "checkBoxMarked" : "checkBox"}
            ></div>
            <span className={dark ? "itemTextDark" : "itemText"}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
