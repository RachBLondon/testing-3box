import React, { Component } from "react";

import Box from "3box";

const getThreeBox = async (address) => {
  const profile = await Box.getProfile(address);
  console.log(profile);
  return profile;
};

export default class App extends Component {

  state = {
    needToAWeb3Browser : false,
  }
  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }
  async componentDidMount() {
    await this.getAddressFromMetaMask();
    if (this.state.accounts) {
      const threeBox = await getThreeBox(this.state.accounts[0]);
      this.setState({ threeBox });
    }
  }
  render() {

    if(this.state.needToAWeb3Browser){
      return <h1>Please install metamask</h1>
    }

    return (
      <div>
        <h1>3Box Demo</h1>
        {this.state.needToAWeb3Browser && <h3>Use a Web3 Enabled Browser</h3>}
        {this.state.accounts && <p>{this.state.accounts[0]}</p>}
      </div>

    );
  }
}


