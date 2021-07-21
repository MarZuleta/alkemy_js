import './App.css';
import InputTransaction from './components/InputTransaction';
import ListTransactions from './components/ListTransactions';
import { createContext, useState } from 'react';

const Context = createContext();

function App() {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => {
    setRefresh(refresh => !refresh);
  }
  return (
    <>
    <Context.Provider value={{refresh, toggleRefresh}}>
    <InputTransaction></InputTransaction>
    <ListTransactions></ListTransactions>
    </Context.Provider>
    </>
  );
}
export {Context};
export default App;
