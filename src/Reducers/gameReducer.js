const initialState = {
  gameTimer: 60,
  ingredients: ['brains','eyes', 'organs', 'limbs', 'brains','eyes', 'organs', 'limbs'],
  orders: ['brainsanwich', "eyeburger", "spagehttieyesworgans", "limbkabab" ],
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
      //remove item from ingredients, add item to plate, generate new rand item in ingredients
      
      console.log('adding to plate')
      return state
    default:
      return state
  }

}

export default gameReducer
