import React, {Component} from 'react';
import video from "./video.mp4";
import Hamster from "./hamster";
import mute from "../mute.jpg";
import unmute from "../unmute.png";

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMuted: true
        }
        this.handleMuteState = this.handleMuteState.bind(this);
    }

    handleMuteState () {
        this.setState(prevState => ({
            isMuted: !prevState.isMuted
        }));
    }

    render () {
        return (
            <div className = "video">
            <video id="background-video" src={video} loop autoPlay muted={this.state.isMuted}/>
            <Hamster handleMuteState={this.handleMuteState}/>
            <button onClick={this.handleMuteState}><img id="music_icon" src={this.state.isMuted ? mute : unmute}></img></button>
            </div>
        )
    }
};
