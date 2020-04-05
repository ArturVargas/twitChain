import React, { Component } from "react";

import TwitChain from "./contracts/TwitChain.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

import PostList from './containers/PostList';

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

      // Va por el Id de la red
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
        for(let i= 1; i <= postCount; i++) {
          const post = await twitChain.methods.posts(i).call();
          this.setState({ posts: [...this.state.posts, post] });
        }
        this.setState({
          posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount)
        });
        this.setState({ loading: false })
      } else { 
        alert('TwitChain contract not deployed to detected network')
      }

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  createPost(content) {
    console.log('----->>> ', content);
    this.setState({ loading: true })
    this.state.twitChain.methods.createPost(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  };

  tipedPost(id, tipAmount){
    this.setState({ loading: true })
    this.state.twitChain.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      console.log(receipt);
      this.setState({ loading: false })
    })
  }

  constructor() {
    super()
    this.createPost = this.createPost.bind(this);
    this.tipedPost = this.tipedPost.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {
          this.state.loading 
            ? <Spinner /> 
            : <PostList 
                posts={this.state.posts} 
                createPost={this.createPost} 
                tipedPost={this.tipedPost}
              />
        }
      </div>
    );
  }
}

export default App;
