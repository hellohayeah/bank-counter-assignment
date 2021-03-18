import useBank from "./useBank";

const names = [
  "Kareem Abdul-Jabbar",
  "Karl Malone",
  "LeBron James",
  "Kobe Bryant",
  "Michael Jordan",
];

function App() {
  const [bank, addClient] = useBank(names);

  return (
    <div className="app">
      <table>
        <thead>
          <tr>
            <th>Counter</th>
            <th>Processting</th>
            <th>Processed</th>
          </tr>
        </thead>
        <tbody>
          {bank.counters.map((counter) => (
            <tr key={counter.name}>
              <td>{counter.name}</td>
              <td>{counter.processting || "idle"}</td>
              <td>{counter.processed.join(",")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <span>Waitring: {bank.wait.length}</span>
        <button onClick={addClient}>Next: {bank.next}</button>
      </div>
    </div>
  );
}

export default App;
