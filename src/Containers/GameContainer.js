import React from "react"
import { connect } from "react-redux"
const ORDERS = 'http://localhost:8000/orders'
const RECIPES_API = 'http://localhost:8000/recipes'
const ING_API = 'http://localhost:8000/ingredients'
const FOODS = 'http://localhost:8000/foods'

class GameContainer extends React.Component{
  componentDidMount() {
    fetch(RECIPES_API)
      .then(r => r.json())
      .then(recipes => {
        this.props.setRecipes(recipes)
      })
    fetch(ORDERS)
      .then(r => r.json())
      .then(orders => {
        this.props.setOrders(orders)
      })
    fetch(ING_API)
      .then(r => r.json())
      .then(ingredients => {
        this.props.setIngredients(ingredients)
      })
    fetch(FOODS)
      .then(r => r.json())
      .then(foods => {
        this.props.setFoods(foods)
      })
  }

  // HELPER FUNCTIONS
  generateArr = (arr) => {
    return arr.map( (item) => {
      // console.log(this.props.state.recipes)
      const recipe = this.props.state.recipes.find((recipe) => {
          return recipe.id === item.recipe_id
        })
      // made a recipe state, to reference each recipe based on id
      // console.log('it picked this one', recipe )
      //recipeId is referencing the recipe that is associated with this order instance
      return(
        <div
          className="col-3 text-center"
          key={item.id}
          recipeId={item.recipe_id}
          id={item.id}
          >
          {item.id}
          {recipe ? <img src={recipe.image} alt={recipe.name} width="100%" /> : null}
        </div>
      )
    })
  }

  generateFoodsArr = (arr) => {
    if (arr){
      return arr.map(item => {
        const ingredient = this.props.state.ingredients.find((ingredient) => {
          return ingredient.id === item.ingredient_id
        })
        //ingredientId is referencing the ingredient that is associated with this food instance
        return(
          <div
            className="col-3 text-center"
            key={item.id}
            ingredientId={item.ingredient_id}
            id={item.id}
            onClick={() => this.props.addPlate(item)}>
            {ingredient ? <img src={ingredient.image} alt={ingredient.name} width="100%" /> : null}
          </div>
        )
      })
    }
  }
  // end HELPER FUNCTIONS

  render(){

    const {foods, orders, plate } = this.props.state
    console.log(orders)
    return(
      <div className="container">
        <div className="row justify-content-center">
          <img src="assets/logo.png" alt="Zombie Diner" width="177px" height="32px" />
        </div>

        <div className="mt-2 row justify-content-center">
          <h5 className="col-sm-12 text-center">ORDERS</h5>
          {this.generateArr(orders)}
        </div>

        <div className="mt-2 row justify-content-center">
          <h5 className="col-sm-12 text-center">INGREDIENTS</h5>
          {this.generateFoodsArr(foods)}
        </div>

        <div className="mt-2 row justify-content-center">
          <h5 className="col-sm-12 text-center">PLATE</h5>
          {this.generateFoodsArr(plate)}

          <div className="col-sm-12 text-center">
            <button
              className="mt-2 btn-lg btn-danger"
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
    addPlate: food => dispatch({
      type: 'ADD_PLATE', food: food
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
  }),
      setFoods: foods => dispatch({
    type: 'SET_FOODS', foods: foods
  })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
