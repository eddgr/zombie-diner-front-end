const brains = { id: 1, name: 'brains' }
const eyes = { id: 2, name: 'eyes' }
const organs = { id: 3, name: 'organs' }
const limbs = { id: 4, name: 'limbs' }

const initialState = {
  gameTimer: 60,
  ingredients: [brains, eyes, organs, limbs],
  orders: [
    { id: 1,
      name: 'brainsanwich',
      ingredients: [brains]
    },
    { id: 2,
      name: 'eyeburger',
      ingredients: [eyes, organs] },
    { id: 3,
      name: 'spagehttieyesworgans',
      ingredients: [organs] },
    { id: 4,
      name: 'limbkabab',
      ingredients: [brains, eyes, limbs] }
  ],
  plate: [],
  score: '',
  bonusCounter: 0,
  // bonusCounter needs 3, 3 star dishes to  add '15' seconds to the game timer
  startGame: false
}

function gameReducer( state = initialState, action ){

  switch (action.type) {
    case 'START_GAME':
    // console.log('start game', state)
      return {
        ...state,
        startGame: true
      }
    case 'ADD_PLATE':

      //remove item from ingredients,
      const ingredientsCopy = [...state.ingredients]
      const filteredIngredient = ingredientsCopy.filter( ingredient => {return ingredient.id !== action.payload.id})
      // console.log(filteredIngredient);

      // add item to plate
      const plateCopy = [...state.plate, action.payload]
      console.log(plateCopy);


      console.log('adding to plate')
      return { ...state,
        ingredients: filteredIngredient,
        plate: plateCopy
      }
    case 'SERVE_PLATE':
      console.log('SERVE_PLATE')
      // match by length
      const matchedOrders = state.orders.filter(order => order.ingredients.length === action.payload.length)
      //goes through each order array and check the ingredients against what we have on the plate
      // we want a boolean return that makes sure all ingredient items are included, no extra should be present
        // .some returns boolean
      const sortPlate = state.plate.sort((a, b) => a.id - b.id)
      //sorted the plate ingredients

      const thisOrder = matchedOrders.find(order => {
        // debugger
        const orderIds = order.ingredients.map(ingredient=> ingredient.id).join()
        const plateIds = sortPlate.map(ingredient=> ingredient.id).join()
        // debugger
        return orderIds === plateIds
        // return Object.keys(order.ingredients).join() === Object.keys(sortPlate).join()
        // return order.ingredients.join(", ") === sortPlate.join(", ")
      })


      // console.log('this is order', order.ingredients)
      console.log('am i right?', thisOrder)
      // console.log('sorted plate', sortPlate)

      const plateBoo = state.plate.map(plate => {
        // includes
      })
      // remove order from orders

      // debugger

      return state
    default:
      return state
  }

}

export default gameReducer
