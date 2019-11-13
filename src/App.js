import React, { Component } from "react";
import QR from "./demo-qr.png";
import { BounceLoader } from "react-spinners";

import Box from "3box";
import ThreeBoxComments from "3box-comments-react";
import ProfileHover from "profile-hover";
import ChatBox from "3box-chatbox-react";

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
    const admin = "0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386";
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>;
    }

    return (
      <div style={{ width: "400px", margin: "auto", textAlign: "center" }}>
        <h1>3Box Demo</h1>
        {this.state.needToAWeb3Browser && <h3>Use a Web3 Enabled Browser</h3>}
        {this.state.accounts && (
          <div
            style={{
              display: "flow-root",
              display: "flowRoot",
              width: "177.516px",
              margin: "auto"
            }}
          >
            <ProfileHover
              address={this.state.accounts[0]}
              showName={true}
              noImgs={true}
            />
          </div>
        )}
        <div>
          <img src={QR} />
        </div>
        {(!this.state.accounts || !this.state.openedBox) && (
          <div style={{ width: "60px", margin: "auto" }}>
            <BounceLoader color="blue" />
          </div>
        )}
        {this.state.accounts && this.state.openedBox && (
          <div>
            <ChatBox
              // required
              spaceName={spaceName}
              threadName="myThreadNameyeah!!!!!!"
              // Required props for context A) & B)
              box={this.state.openedBox}
              currentUserAddr={this.state.accounts[0]}
            />

            {/* <ThreeBoxComments
              // required
              spaceName={spaceName}
              threadName="myThreadName"
              adminEthAddr={admin}
              // Required props for context A) & B)
              box={this.state.openedBox}
              currentUserAddr={this.state.accounts[0]}
            /> */}
          </div>
        )}
      </div>
    );
  }
}
