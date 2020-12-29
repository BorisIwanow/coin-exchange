
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
      showBalance: true,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 30000,
          balance: 0.5
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          price: 10000,
          balance: 10.5
        },
        {
          name: 'CranePay',
          ticker: 'CRP',
          price: 1.2,
          balance: 300000
        }
      ]
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleBalanceVisibilityChange = this.handleBalanceVisibilityChange.bind(this)
  }


  handleBalanceVisibilityChange(){
    this.setState(function(oldState){
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      };
  });
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
        <AccountBalance 
          amount={this.state.balance} 
          showBalance={this.state.showBalance} 
          handleBalanceVisibilityChange={this.handleBalanceVisibilityChange}
        />
        <CoinList 
          coinData={this.state.coinData} 
          handleRefresh={this.handleRefresh} 
          showBalance={this.state.showBalance}/>
      </div>
    );
  
  }
}

export default App;
