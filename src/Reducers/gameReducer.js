const initialState = {
  // START
  gameTimer: 60,
  startGame: false,

  // FOOD
  orders: [],
  foods: [],
  // allows us to make multiple ingredients
  plate: [],

  // SCORE
  score: '',
  bonusCounter: 0
  // bonusCounter needs 3, 3 star dishes to  add '15' seconds to the game timer
}

function gameReducer( state = initialState, action ){

  switch (action.type) {

    case 'START_GAME':
      return {
        ...state,
        startGame: true
      }
    // end START_GAME

    case 'ADD_PLATE':
      //remove item from ingredients,
      const foodsCopy = [...state.foods]
      const filteredFood = foodsCopy.filter( food => {
        // debugger
        return food.id !== action.food.id
      })
      // add item to plate
      const plateCopy = [...state.plate, action.food]
      return { ...state,
        foods: filteredFood,
        plate: plateCopy
        }
    // end ADD_PLATE

    case 'SERVE_PLATE':
      console.log('SERVE_PLATE')
      // match by length

      const servePlate = [...state.plate]
      const matchedOrders = state.orders.filter(order => {
        return order.recipe.ingredients.length === servePlate.length
      })
      //returns matched length of orders
      //goes through each order array and check the ingredients against what we have on the plate
      // we want a boolean return that makes sure all ingredient items are included, no extra should be present
        // .some returns boolean
      const sortPlate = state.plate.sort((a, b) => a.id - b.id)
      //sorted the plate ingredients

      const thisOrder = matchedOrders.find(order => {
        const orderIds = order.ingredients.map(ingredient=> ingredient.id).join()
        const plateIds = sortPlate.map(ingredient=> ingredient.id).join()

        // if orderIds and plateIds match, return it otherwise return false
        if (orderIds === plateIds) {
          return orderIds === plateIds
        } else {
          return false
        }
      })

      let filterOrder = [...state.orders]

      if (thisOrder) {
        filterOrder = [...state.orders].filter( order => {
          return order.id !== thisOrder.id
        })
      }

      return {
        ...state,
        orders: filterOrder,
        plate: []
      }
    // end SERVE_PLATE

    case "SET_ORDERS":
      return {
        ...state,
        orders: action.orders
      }
    // end SET_ORDERS

    case "SET_FOODS":
      return {
        ...state,
        foods: action.foods
      }
    // end SET_FOODS

    default:
      return state
  } // end switch

}

export default gameReducer
