import {
    RECEIVE_ENTRIES,
    ADD_ENTRY
} from '../actions'
import prefState from '../utils/helpers'

const initialPref = {
    appPref:'Uber',
    appTimeout:'Always',
    maxPickupDistance:5,
    LowestPassengerRating:4.5,
    carPoolPref :'Yes',
}



export default function prefEntries (state = initialPref, action){
    console.log("====================================")
    console.log(state)
    switch(action.type){
        case RECEIVE_ENTRIES:
            return{
                ...state,
                ...action.entries,
            }
        case ADD_ENTRY:
            return{
                ...state,
                ...action.entry,
            }
        default:
            return state
    }
}
