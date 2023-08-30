const INITIAL_STATE = {
  recipes: [],
};

function FoodReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
}

export default FoodReducer;
