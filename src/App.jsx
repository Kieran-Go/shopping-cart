import Header from "./components/Header";
import { useState } from "react";

function App() {
  const pages = ["Home", "Shop"]; // Array containing the names of pages for navigation
  const [pageState, setPageState] = useState(pages[0]); // Current page state for conditional page rendering

  return (<>
  {/* Render the Header component */}
  <Header 
    pages = {pages}
    setPageState = {setPageState}
  />

  {/* Conditional rendering of either the Home or Shop page depending on pageState */}
  {pageState === pages[0] && (
    <p>Show the Home page</p> // Placeholder p element to be replaced with a Home component later
  )}
  {pageState === pages[1] && (
    <p>Show the Shop page</p> // Placeholder p element to be replaced with a Shop component later
  )}
  </>);
}
export default App;