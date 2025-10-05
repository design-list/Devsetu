import { HOME_DATA_FAILED, HOME_DATA_RESPONSE } from "../types/homeTypes"


const initialState = {
    homeData: null,
    heroBanner: null,
    pujaCard: null,
    chadhavaCard: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case HOME_DATA_RESPONSE:
            return { ...state, pujaDetail: action.payload, heroBanner: action.payload.heroBanner, pujaCard: action.payload.pujaCard,
                chadhavaCard: action.payload.chadhavaCard
            }
        case HOME_DATA_FAILED:
            return { ...state, pujaDetail: action.payload }

        default:
            return state
    }
}
