
import React, {useState, useEffect} from 'react';
// import './App.css';
import logo from './logo.svg';
import Coin from './components/Coin/Coin';
import CoinList       from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
import axios from 'axios';


const COIN_COUNT = 5;
const formatPrice = price => parseFloat(Number(price).toFixed(6))

function App(props) {

var state = {
    balance: 1000000,
    showBalance: true,
    coinData: [
      /*
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
      }*/
    ]
  };

  const[balance, setBalance] = useState(10000);
  const[showBalance, setShowBalance] = useState(true);
  const[coinData, setCoinData] = useState([]);


  const  componentDidMount = async () => {
    
    let response = await axios.get("https://api.coinpaprika.com/v1/coins")
    // debugger;
    let coinIds = response.data.slice(0, COIN_COUNT).map( coin => coin.id);

    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    
    const promises = coinIds.map( id => axios.get(tickerUrl + id));

    const coinData = await Promise.all(promises);

    const coinPriceData = coinData.map( function(response){
      const coin = response.data;
      return {
        key: coin.id,
        id:  coin.id,
        name: coin.name,
        ticker: coin.symbol, 
        balance: 0,
        price: formatPrice(coin.quotes.USD.price),
      }
    })
// debugger;
    setCoinData(coinPriceData);

  }



  useEffect( function(){
    if (coinData.length === 0){
      // did mount
      componentDidMount();

    }else{
      // did update

    }
  });


  // constructor(props){
  //   super(props);
  // }


const  handleBalanceVisibilityChange = () =>{
  setShowBalance(oldValue => !oldValue)
}

const handleRefresh = async (valueChangeId) => {
  const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
  const response = await axios.get(tickerUrl);
  const newPrice = formatPrice(response.data.quotes.USD.price);
  const newCoinData = coinData.map(  function( values ) {
    
    let newValues = {...values};

    if(valueChangeId === values.key){
      newValues.price = newPrice;
    }

    return newValues;
  });
  
  setCoinData(newCoinData);
}

  
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} alt="React Logo"/> */}
        <h1>Coin Exchange</h1>
      </header>
      <AccountBalance 
        amount={balance} 
        showBalance={showBalance} 
        handleBalanceVisibilityChange={handleBalanceVisibilityChange}
      />
      <CoinList 
        coinData={coinData} 
        handleRefresh={handleRefresh} 
        showBalance={state.showBalance}/>
    </div>
  );


}

export default App;
