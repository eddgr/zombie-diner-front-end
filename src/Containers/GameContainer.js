import React from "react"
import { connect } from "react-redux"
const ORDERS_API = 'http://localhost:3000/orders'
const RECIPES_API = 'http://localhost:3000/recipes'
const ING_API = 'http://localhost:3000/ingredients'

class GameContainer extends React.Component{
  componentDidMount() {
    fetch(RECIPES_API)
      .then(r => r.json())
      .then(recipes => {
        this.props.setRecipes(recipes)
      })
    fetch(ORDERS_API)
      .then(r => r.json())
      .then(orders => {
        this.props.setOrders(orders)
      })
    fetch(ING_API)
      .then(r => r.json())
      .then(ingredients => {
        this.props.setIngredients(ingredients)
      })
  }
  generateArr = (arr) => {
    return arr.map( (item) => {
      console.log(item)
      // console.log(this.props.state.recipes)
      const recipe = this.props.state.recipes.find((recipe) => {
          return recipe.id === item.recipe_id
        })
      console.log('it picked this one', recipe )
      // debugger
      //item : { id: 1,
      //   name: 'brainsanwich',
      //   ingredients: [brains]
      // }
      return(
        <div
          className="col-3 text-center"
          key={item.id}
          recipeId={item.recipe_id}
          id={item.id}
          >
          {item.id}
          {recipe ? <img src={recipe.image} alt={recipe.name} width="100%" />: null }
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

    // console.log("GameContainer state", this.state)

    return(
      <div className="container">
        <div className="row justify-content-center">
          <img src="assets/logo.png" alt="Zombie Diner" width="177px" height="32px" />
        </div>

        <div className="mt-4 row justify-content-center">
          <h2 className="col-sm-12 text-center">ORDERS</h2>
          {this.generateArr(orders)}
        </div>

        <div className="mt-4 row justify-content-center">
          <h2 className="col-sm-12 text-center">INGREDIENTS</h2>
          {this.generateIngredientsArr(ingredients)}
        </div>

        <div className="mt-4 row justify-content-center">
          <h2 className="col-sm-12 text-center">PLATE</h2>
          {this.generateArr(plate)}

          <div className="col-sm-12 text-center">
            <button
              className="mt-4 btn-lg btn-danger"
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
    }),
      setOrders: orders => dispatch({
      type: 'SET_ORDERS', orders: orders
    }),
      setRecipes: recipes => dispatch({
    type: 'SET_RECIPES', recipes: recipes
  })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
