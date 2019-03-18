import React, { Component } from "react";
import "./App.css";
import Game from "./components/game";
import Hamster from "./components/hamster";
//import Player from "./components/video";

class App extends Component {
  render() {//player
    return (<>
    <Game/>
    <Hamster/>
    </>);
  }
}

export default App;
