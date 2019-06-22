import React from "react"
import { connect } from "react-redux"
const RECIPES_API = 'http://localhost:3001/recipes'

const ING_API = 'http://localhost:3001/ingredients'

class GameContainer extends React.Component{
  state = {
    recipes: [],
    ingredients: []
  }
  componentDidMount() {
    fetch(RECIPES_API)
      .then(r => r.json())
      .then(recipes => {
        this.setState({ recipes })
      })
    fetch(ING_API)
      .then(r => r.json())
      .then(ingredients => {
        // this.setState({ ingredients })
        this.props.setIngredients(ingredients)
      })
  }
  generateArr = (arr) => {
    return arr.map( (item) => {
      return(
        <div
          className="col-3 text-center"
          key={item.id}
          id={item.id}
          >
          <img src={item.image} alt={item.name} width="100%" />
        </div>
      )
    })
  }
  //can add onclicks and extract out maps
  generateIngredientsArr = (arr) => {
    return arr.map(item => {
      return(
        <div
          className="col-3 text-center"
          key={item.id}
          id={item.id}
          onClick={() => this.props.addPlate(item)}>
          <img src={item.image} alt={item.name} width="100%" />
        </div>
      )
    })
  }
  //extracted out generateIngredientsArr


  render(){

    const {ingredients, orders, plate } = this.props.state

    console.log("GameContainer state", this.state)

    return(
      <div className="container">
        <div className="row justify-content-center">
          from game container
        </div>

        <div className="row justify-content-center">
          <h2 className="col-sm-12 text-center">ORDERS</h2>
          {this.generateArr(this.state.recipes)}
        </div>

        <div className="row justify-content-center">
          <h2 className="col-sm-12 text-center">INGREDIENTS</h2>
          {this.generateIngredientsArr(ingredients)}
        </div>

        <div className="row justify-content-center">
          <h2 className="col-sm-12 text-center">PLATE</h2>
          {this.generateArr(plate)}

          <div className="col-sm-12 text-center">
            <button
              className="btn btn-primary"
              onClick={() => this.props.servePlate(plate)}>
              Serve
            </button>
          </div>

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
    }),
    setIngredients: ingredients => dispatch({
      type: 'SET_INGREDIENTS', ingredients: ingredients
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
