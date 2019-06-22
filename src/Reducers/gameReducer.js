const initialState = {
  gameTimer: 60,
  ingredients: [
    { id: 1, name: 'brains' },
    { id: 2, name: 'eyes' },
    { id: 3, name: 'organs' },
    { id: 4, name: 'limbs' }
    ],
  orders: [
    { id: 1, name: 'brainsanwich' },
    { id: 2, name: 'eyeburger' },
    { id: 3, name: 'spagehttieyesworgans' },
    { id: 4, name: 'limbkabab' }
  ],
  plate: [],
  score: '',
  bonusCounter: 0,
  // bonusCounter needs 3, 3 star dishes to  add '15' seconds to the game timer
  startGame: false,

}

function gameReducer( state = initialState, action){

  switch (action.type) {
    case 'START_GAME':
    // console.log('start game', state)
      return {
        ...state,
        startGame: true
      }
    case 'ADD_PLATE':
    // console.log('start game', state)
      // return {
      //   ...state,
      //   plate: action.payload
      // }

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
    default:
      return state
  }

}

export default gameReducer
