import React from "react"
import { connect } from "react-redux"
const ORDERS = 'http://localhost:8000/orders'
const FOODS = 'http://localhost:8000/foods'

class GameContainer extends React.Component{
  componentDidMount() {
    fetch(ORDERS)
      .then(r => r.json())
      .then(orders => {
        this.props.setOrders(orders)
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
      //recipeId is referencing the recipe that is associated with this order instance
      return(
        <div
          className="col-3 text-center"
          key={item.id}
          recipeId={item.recipe_id}
          id={item.id}
          >
          {item.id}
          {item.recipe ? <img src={item.recipe.image} alt={item.recipe.name} width="100%" /> : null}
        </div>
      )
    })
  }

  generateFoodsArr = (arr) => {
    if (arr){
      return arr.map(item => {
        //ingredientId is referencing the ingredient that is associated with this food instance
        return(
          <div
            className="col-3 text-center"
            key={item.id}
            ingredientId={item.ingredient_id}
            id={item.id}
            onClick={() => this.props.addPlate(item)}>
            {item.ingredient ? <img src={item.ingredient.image} alt={item.ingredient.name} width="100%" /> : null}
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
    setOrders: orders => dispatch({
      type: 'SET_ORDERS', orders: orders
    }),
    setFoods: foods => dispatch({
      type: 'SET_FOODS', foods: foods
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
