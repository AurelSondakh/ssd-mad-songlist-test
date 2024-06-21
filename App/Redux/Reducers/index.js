import {combineReducers} from "redux"
import { MusicReducer } from "./Music";

const rootReducer = combineReducers({
    music: MusicReducer
});


export default rootReducer;