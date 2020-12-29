
import React, { Component } from 'react';
// import './App.css';
import logo from './logo.svg';
import Coin from './components/Coin/Coin';
import CoinList       from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      balance : 1000000,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 30000
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          price: 10000
        },
        {
          name: 'CranePay',
          ticker: 'CRP',
          price: 1.2
        }
      ]
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

handleRefresh(valueChangeTicker){
  const newCoinData = this.state.coinData.map( function({ticker, name, price}) {
    let newPrice = price;
    if(valueChangeTicker === ticker){
        const randomPercentage = 0.995 + Math.random()* 0.01;
        newPrice = newPrice * randomPercentage;
                
    }
    return {
        ticker, 
        name, 
        price:newPrice
    }
  });
  this.setState({coinData: newCoinData});
}

  render(){
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} alt="React Logo"/> */}
          <h1>Coin Exchange</h1>
        </header>
        <AccountBalance amount={this.state.balance} />
        <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh}/>
      </div>
    );
  
  }
}

export default App;
