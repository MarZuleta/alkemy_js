import React from 'react';
import Header from './Header';
import InputTransaction from './InputTransaction';
import ListTransactions from './ListTransactions';
import Styles from './Home.css';



function Home() {
    
    return (
        <>
            
    <Header></Header>
    <div className='flex-center'>
    <h1>Budget Manager</h1>
    </div>
    
    <InputTransaction></InputTransaction>
    <ListTransactions></ListTransactions>
    
        </>
    )
}

export default Home
