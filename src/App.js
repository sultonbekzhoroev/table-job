import "./App.scss";
import FormTable from "./components/FormTable/FormTable";
import Table from "./components/Table/Table";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Table for Kanalservis</h1>
        <FormTable />
        <Table />
      </div>
    </div>
  );
}

export default App;
