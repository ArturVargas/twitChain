import React, { Component } from "react";
import TwitChain from "./contracts/TwitChain.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import Navbar from './components/Navbar';

class App extends Component {
  state = {
    account: '',
    twitChain: null,
    postCount: 0,
    posts: [],
    loading: true
  }
  componentDidMount = async () => {
    try {
      //instacia de web3
      const web3 = await getWeb3();
      // regresa un array de accounts
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      this.setState({ account: accounts[0] })

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TwitChain.networks[networkId];

      if (deployedNetwork) {
        const twitChain = new web3.eth.Contract(
          TwitChain.abi,
          deployedNetwork.address,
        );
        this.setState({ twitChain });
        const postCount = await twitChain.methods.postCount().call()
        this.setState({ postCount })

      }

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {

    return (
      <div className="App">
        <Navbar account={this.state.account}/>

      </div>
    );
  }
}

export default App;
