import React from 'react';
// import HomeContainer from './Containers/HomeContainer.js'
import GameContainer from './Containers/GameContainer.js'

import Countdown from 'react-countdown-now';

let timeMax = 20

const renderer = ({ hours, minutes, seconds, completed }) => {
  let time = (seconds/timeMax)*100
  const countdown = {
    width: `${time}%`
  }

  return (
    <div class="progress rounded-0">
      <div className="progress-bar bg-danger" role="progressbar" style={countdown} aria-valuenow={seconds} aria-valuemin="0" aria-valuemax={timeMax}></div>
    </div>
  )
};

class App extends React.Component {
  state = {
    gameStart: true
  }

  completeGame = () => {
    this.setState({
      gameStart: false
    })
  }

  render() {
    return (
      <div className="text-center">
        {
          this.state.gameStart ?
          <React.Fragment>
            <Countdown
              onComplete={() => this.completeGame()}
              renderer={renderer}
              date={Date.now() + timeMax * 1000} />
            <GameContainer />
          </React.Fragment>
        :
          <React.Fragment>
            <h2 className="mt-4 text-danger text-center">Thanks for playing</h2>
            <img src="assets/logo.png" alt="Zombie Diner" width="177px" height="32px" />
            <br />
            <a href="" className="mt-4 btn btn-danger">PLAY AGAIN</a>
          </React.Fragment>
        }
      </div>
    );
  }
}

// <HomeContainer />
export default App;
