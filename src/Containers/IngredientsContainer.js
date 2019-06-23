import React from "react"
import IngredientItem from "../Components/IngredientItem"
// import { connect } from "react-redux"


class IngredientsContainer extends React.Component{
  state = {
    activeIngredients: [{},{},{},{},{},{},{},{}]
  }
  generateItem = (ingredientsProps) => {

    let num = Math.floor(Math.random()*(3+1))
    return [...this.state.activeIngredients].map(ingredient => (
        <IngredientItem
          ingredient={ingredientsProps[num]}
         />
        ))
  }
  displayImage = () => {


  }
  render(){
    console.log("ingredients container", this.props)
    console.log(this.state.activeIngredients);
    return(
    <div>
      THIS IS THE INGREDIENTS CONTAINER
      {this.generateItem(this.props.ingredients)}
    </div>


    )
  }
}
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     startGame: () => {
//       dispatch( { type:"START_GAME"} )
//     }
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     state
//   }
// }

export default IngredientsContainer
