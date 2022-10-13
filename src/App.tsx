import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddEmployee } from "./component/addemployee";
import { Home } from "./component/home";
import { ViewEmployee } from "./component/viewemployee";

function App() {
  const [tempEmployee, updateEmployee] = useState(0);
    return (
      <div>
        <Home />
        <AddEmployee Employee={tempEmployee} />
        <ViewEmployee updateEmployee={updateEmployee} /> 
      </div>
    );
  }
  
  export default App;