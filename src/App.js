import React, { Component } from "react";
import QR from "./demo-qr.png";

import Box from "3box";
import ThreeBoxComments from "3box-comments-react";
import ProfileHover from "profile-hover";


const spaceName = "testing3Boxyeah!!";

export default class App extends Component {
  state = {
    needToAWeb3Browser: false
  };

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
      const openedBox = await Box.openBox(
        this.state.accounts[0],
        window.ethereum
      );
      this.setState({ openedBox });
      const space = await this.state.openedBox.openSpace(spaceName);
      this.setState({ space });
    }
  }

  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>;
    }

    const admin = "0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386";

    return (
      <div style={{ width: "400px", margin: "auto", textAlign: "center" }}>
        <h1>3Box Demo</h1>
        {this.state.needToAWeb3Browser && <h3>Use a Web3 Enabled Browser</h3>}
        {this.state.accounts && (
          <div>
            <threebox-address
              data-address={this.state.accounts[0]}
            ></threebox-address>
            <ProfileHover address={this.state.accounts[0]} />
          </div>
        )}
        <img src={QR} />
        {this.state.accounts && this.state.openedBox && (
          <ThreeBoxComments
            // required
            spaceName={spaceName}
            threadName="myThreadName"
            adminEthAddr={admin}
            // Required props for context A) & B)
            box={this.state.openedBox}
            currentUserAddr={this.state.accounts[0]}
          />
        )}
      </div>
    );
  }
}
