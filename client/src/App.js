import './App.css';
import Transactions from './components/Transactions';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import { createContext, useState } from 'react';
const Context = createContext();


function App() {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => {
    setRefresh(refresh => !refresh);
  }
  return (
    <>
    <Router>
        <Switch>
          <Route path="/transactions">
          <Context.Provider value={{refresh, toggleRefresh}}>
            
            <Transactions />
            </Context.Provider>
          </Route>
          {/* <Route path="/users">
            <Users />
          </Route> */}
          <Route path="/">
          <Context.Provider value={{refresh, toggleRefresh}}>
            <Home />
            </Context.Provider>
          </Route>
        </Switch>
    </Router>
    
    </>
  );
}

export {Context};
export default App;
