import React from "react"
import { connect } from "react-redux"


class HomeContainer extends React.Component{
  render(){
    console.log(this.props.state)
    return(
    <div>
      <h1>ZOMBIE DINER</h1>
      <button onClick={this.props.startGame}>
        Start Game
      </button>
      <br/>
      <button>High Score</button>
    </div>


    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => {
      dispatch( { type:"START_GAME"} )
    }
  }
}

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
