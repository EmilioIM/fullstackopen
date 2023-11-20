import { Filter } from "./components/Filter";
import { useState } from "react";
import { Countries } from "./components/Countries";

const App = () => {
  const [filter, setFilter] = useState('')


  const handleSearch = (event) => {
    setFilter(event.target.value)
  }


  return (
    <>
      <Filter searchText={filter} handleChange={handleSearch}/>
      <Countries filter={filter} />
    </>
  );
}

export default App;
