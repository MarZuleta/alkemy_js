import React, {useContext, useState, useEffect} from 'react';
import Header from './Header';
import InputTransaction from './InputTransaction';
import ListTransactions from './ListTransactions';
import Styles from './Home.css';
import {Context} from '../App'


function Home() {
    const {refresh} = useContext(Context);
    const [transactions, setTrans] = useState({
        transes: [],
        currentBudget: 0
      });
      

    const getTrans = async () => {
        try{
          const response = await fetch("http://localhost:3000/");
          let latestData = await response.json();
          let newBudget = 0;
          latestData.forEach(data => {
            if(data.type === 'IN'){
              newBudget += data.amount;
            } else{
              newBudget -= data.amount;
            }
          });
          if(latestData.length > 10){
            latestData = latestData.slice(0, 10);
          }
          let newTrans = {...transactions};
          newTrans['transes'] = latestData;
          newTrans['currentBudget'] = newBudget; 
          setTrans(newTrans);
        } catch(err){
            console.log(err.message);
        }
      };
      useEffect(() => {
        getTrans();
      }, [refresh]);
    
    return (
        <>
            
    <Header></Header>
    <div className='flex-center'>
    <h1>Budget Manager</h1>
    <h2>Current budget:</h2>
    <h3>${transactions.currentBudget}</h3>
    </div>
    <div className='input-btn'>
         <InputTransaction></InputTransaction>
    </div>
   
    <ListTransactions transactions={transactions}></ListTransactions>
    
        </>
    )
}

export default Home
