import React from "react"
import { connect } from "react-redux"

class GameContainer extends React.Component{

  generateArr = (arr) => {
    return arr.map( (item) => {
      return(
        <li
          key={item.id}
          id={item.id}
          onClick={() => this.props.addPlate(item)}>
          {item.name}
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
          PLATE
          {this.generateArr(plate)}
        </ul>
        <button onClick={() => this.props.servePlate(plate)}>Serve</button>
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
    }),
    servePlate: plate => dispatch({
      type: 'SERVE_PLATE', payload: plate
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
