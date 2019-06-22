import React from "react"
import { connect } from "react-redux"

class GameContainer extends React.Component{

  generateArr = (arr) => {
    return arr.map( (item) => {
      return(
        <li onClick={() => this.props.addPlate(item)}>
          {item}
        </li>
      )
    })
  }

  render(){

    const {ingredients, orders, plate } = this.props.state

    return(
    <div>
      from game container
      <div id="orders">
        <ul>
          {this.generateArr(orders)}
        </ul>
      </div>

      <div id="ingredients">
        <ul>
          {this.generateArr(ingredients)}
        </ul>
      </div>

      <div id="plate">
        <ul>
          {this.generateArr(plate)}
        </ul>
      </div>

    </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
  addPlate: ingredient => dispatch({
      type: 'ADD_PLATE', payload:ingredient
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
