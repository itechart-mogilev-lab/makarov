import React, {Component} from "react";
import hamster from "../hamster_1.png";

export default class Hamster extends Component {
    render() {
        return (
            <div class="hamster">
                <img src={hamster} className="App-logo" alt="logo" />
                <p>Inasne anti-gravity hamster with watermark</p>
            </div>
        )
    }
} 