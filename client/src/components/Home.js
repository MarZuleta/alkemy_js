import React, { useContext, useState, useEffect, useRef } from "react";
import Header from "./Header";
import InputTransaction from "./InputTransaction";
import ListTransactions from "./ListTransactions";
import "./Home.css";
import { Context } from "../App";
import CountUp from "react-countup";

function Home() {
  const { refresh } = useContext(Context);
  const [transactions, setTrans] = useState({
    transes: [],
    currentBudget: 0,
  });

  //Ref on CountUp
  const count = useRef(null);

// Change color when current budget is negative
  const onEnd = () => {
    if (transactions.currentBudget < 0) {
      count.current.style.color = "#f50057";
    } else {
      count.current.style.color = "#000000";
    }
  };
  // GET HTTP
  const getTrans = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      let latestData = await response.json();
      let newBudget = 0;
      latestData.forEach((data) => {
        if (data.type === "IN") {
          newBudget += data.amount;
        } else {
          newBudget -= data.amount;
        }
      });
      if (latestData.length > 10) {
        latestData = latestData.slice(0, 10);
      }
      let newTrans = { ...transactions };
      newTrans["transes"] = latestData;
      newTrans["currentBudget"] = newBudget;
      setTrans(newTrans);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTrans();
    // toRed();
  }, [refresh]);

  return (
    <>
      <Header></Header>
      <div className="flex-center">
        <h1>Budgetman</h1>
        <h2>My balance is:</h2>
        <h3 ref={count}>
          <CountUp
            ref={count}
            className="current-budget"
            start={0}
            end={transactions.currentBudget}
            duration={2.75}
            useEasing={true}
            useGrouping={true}
            separator=","
            decimals={2}
            redraw={true}
            decimal="."
            prefix="$ "
            onEnd={onEnd}
          />
        </h3>
        {/* ${transactions.currentBudget.toLocaleString(undefined, {maximumFractionDigits:2})} */}
      </div>
      <div className="input-btn">
        <InputTransaction></InputTransaction>
      </div>
      <div className="trans-list">
        <ListTransactions transactions={transactions}></ListTransactions>
      </div>
    </>
  );
}

export default Home;
