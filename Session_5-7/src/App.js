import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Read from "./routes/Read";
import Create from "./routes/Create";
import Update from "./routes/Update";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navigation />
        <Route path="/read" component={Read} />
        <Route path="/create" component={Create} />
        <Route path="/update/:filename" component={Update} />
      </HashRouter>
    </div>
  );
}

export default App;
