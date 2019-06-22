import React from "react"
import { connect } from "react-redux"

class GameContainer extends React.Component{

  generateArr = (arr) => {
    return arr.map( (item) => {
      return(
        <li
          key={item.id}
          id={item.id}
          >
          {item.name}
        </li>
      )
    })
  }
  //can add onclicks and extract out maps
  generateIngredientsArr = (arr) => {
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
  //extracted out generateIngredientsArr


  render(){

    const {ingredients, orders, plate } = this.props.state

    return(
    <div>
      from game container
      <div>
        <ul id="orders">
          {this.generateArr(orders)}
        </ul>
      </div>

      <div>
        <ul id="ingredients">
          {this.generateIngredientsArr(ingredients)}
        </ul>
      </div>

      <div>
        <ul id="plate">
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
      type: 'ADD_PLATE', ingredient: ingredient
    }),
    servePlate: plate => dispatch({
      type: 'SERVE_PLATE', plate: plate
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
