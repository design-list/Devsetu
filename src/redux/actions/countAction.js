import { DECREMENT_NUMBERS, INCREMENT_NUMBERS } from "../types/count";

export const increment = () => ({
    type: INCREMENT_NUMBERS,
})

export const decrement = () => ({
    type: DECREMENT_NUMBERS,
})
