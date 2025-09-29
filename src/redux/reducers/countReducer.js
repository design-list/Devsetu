import { DECREMENT_NUMBERS, INCREMENT_NUMBERS } from "../types/count";

const initialState = {
    count:0,
}
const  reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_NUMBERS :
            return {count:state.count + 1}
        case DECREMENT_NUMBERS:
            return {count:state.count - 1}
        // case 'reset':
        //     return initialState
        default:
            return state
    }
}

export default reducer