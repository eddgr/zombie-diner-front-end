import React from "react"
import { connect } from "react-redux"
const ORDERS = 'http://localhost:8000/orders'
const FOODS = 'http://localhost:8000/foods'

let ingLength = 8

class GameContainer extends React.Component{
  state = {
    orderClicked: false,
    orderIngredients: [],
    orderName: ''
  }

  componentDidMount() {
    // fetch(ORDERS)
    //   .then(r => r.json())
    this.fetchHelp(ORDERS)
      .then(orders => {
        this.props.setOrders(orders)
      })
    // fetch(FOODS)
    //   .then(r => r.json())
    this.fetchHelp(FOODS)
      .then(foods => {
        this.props.setFoods(foods)
      })
  }

  // HELPER FUNCTIONS
  fetchHelp = api => {
    return fetch(api)
      .then(r => r.json())
  }

  orderClick = () => {
    this.setState({
      ...this.state,
      orderClicked: !this.state.orderClicked
    })
  }

  handleOrder = (event) => {
    const filterOrder = this.props.state.orders.filter(order => {
      return order.recipe.name === event.currentTarget.dataset.name
    })

    console.log('filterOrder', filterOrder)

    this.setState({
      ...this.state,
      orderClicked: true,
      orderName: event.currentTarget.dataset.name,
      ingredients: filterOrder[0].recipe.ingredients
    })
  }

  handleServe = (plate) => {
    this.props.servePlate(plate)
  }

  handleThrow = () => {
    this.props.throwPlate()
    ingLength -= 1

    this.fetchHelp(FOODS)
      .then(foods => {
        this.props.setFoods(foods)
      })
  }


  // for Orders
  generateArr = (arr) => {
    // if current item length is < 4, show the next item every 5 seconds

    // else just show array

    // show the first 4 array item
    return arr.slice(0,4).map(item => {
      //recipeId is referencing the recipe that is associated with this order instance
      return (
        <div
          className="col-3 text-center"
          onClick={event => this.handleOrder(event)}
          key={item.id}
          data-name={item.recipe.name}
          data-recipe-id={item.recipe_id}
          id={item.id}>

          {item.id}

          {
            item.recipe ? <img src={item.recipe.image} alt={item.recipe.name} width="100%" /> : null
          }
        </div>
      )
    })
  }

  // for Ingredients
  generateFoodsArr = (arr) => {

    if (arr){
      return arr.slice(0,ingLength).map(item => {
        //ingredientId is referencing the ingredient that is associated with this food instance
        return (
          <div
            className="col-3 text-center"
            key={item.id}
            data-ingredient-id={item.ingredient_id}
            id={item.id}
            onClick={() => this.props.addPlate(item)}>
            {item.ingredient ? <img src={item.ingredient.image} alt={item.ingredient.name} width="100%" /> : null}
          </div>
        )
      })
    }
  }

  // for Plate
  generatePlateArr = (arr) => {
    if (arr){
      return arr.map(item => {
        //ingredientId is referencing the ingredient that is associated with this food instance
        return (
          <div
            className="col-3 text-center"
            key={item.id}
            data-ingredient-id={item.ingredient_id}
            id={item.id}>
            {item.ingredient ? <img src={item.ingredient.image} alt={item.ingredient.name} width="100%" /> : null}
          </div>
        )
      })
    }
  }
  // end HELPER FUNCTIONS

  render() {

    const {foods, orders, plate } = this.props.state

    return (
      <React.Fragment>
        {
          this.state.orderClicked ? (
            <div className="order-recipe">
              <div className="container">
                <div className="row m-2 justify-content-center text-center">
                  <h2>
                    {this.state.orderName}
                  </h2>
                  <p>These are the ingredients you need to complete this order. Ingredient order does not matter!</p>
                </div>
                <div className="row justify-content-center text-center">
                  {
                    this.state.ingredients.length > 0 ? this.state.ingredients.map(ingredient => {
                    return <div key={ingredient.id} className="col-3">
                      <img src={ingredient.image} width="100%" alt={ingredient.name} className="bg-light rounded-circle" />
                    </div>
                    })
                  :
                    null
                  }
                </div>

                <div className="row m-2">
                  <div className="mx-auto m-2">
                    Add them to your PLATE before you SERVE it!
                  </div>
                  <button onClick={() => this.orderClick()} className="w-100 mt-2 btn btn-danger">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )
          :
          null
        }
        <div className="container">

          <div className="mt-2 row justify-content-center">
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
            {this.generatePlateArr(plate)}

            <div className="col-sm-12 text-center">
              <button
                className="m-2 btn-lg btn-danger"
                onClick={() => this.handleServe(plate)}>
                Serve Order
              </button> <br/>

              <button
                className="m-2 btn btn-outline-danger"
                onClick={() => this.handleThrow()}>
                Throw Out Plate
              </button>
            </div>

          </div>

        </div>
      </React.Fragment>
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
    }),
    throwPlate: () => dispatch({
      type: 'THROW_PLATE'
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
