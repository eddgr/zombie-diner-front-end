const brains = { id: 1, name: 'brains', image: 'assets/brains.svg' }
const eyes = { id: 2, name: 'eyes', image: 'assets/eyes.svg' }
const organs = { id: 3, name: 'organs', image: 'assets/organs.svg'  }
const limbs = { id: 4, name: 'limbs', image: 'assets/limbs.svg'  }

const initialState = {
  gameTimer: 60,
  // ingredients: [brains, eyes, organs, limbs],
  ingredients: [],
  // used as reference for food instances
  recipes: [],
  // used as reference for order instances
  orders: [],
  plate: [],
  score: '',
  bonusCounter: 0,
  // bonusCounter needs 3, 3 star dishes to  add '15' seconds to the game timer
  startGame: false,
  foods: []
}

function gameReducer( state = initialState, action ){

  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        startGame: true
      }
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
    case 'SERVE_PLATE':
      console.log('SERVE_PLATE')
      // match by length
      const matchedOrders = state.orders.filter(order =>{
        console.log(order)
        return order.ingredients.length === action.plate.length

      }
    )
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
    case "SET_INGREDIENTS":
      return {
        ...state,
        ingredients: action.ingredients
      }
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.orders
      }
    case "SET_RECIPES":
      return {
        ...state,
        recipes: action.recipes
      }
    case "SET_FOODS":
      return {
        ...state,
        foods: action.foods
      }
    default:
      return state
  }

}

export default gameReducer
