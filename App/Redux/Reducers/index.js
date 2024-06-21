import {combineReducers} from "redux"
import { MusicReducer } from "./Music";
import favoritesReducer from "./Favorites";

const rootReducer = combineReducers({
    music: MusicReducer,
    favorites: favoritesReducer
});


export default rootReducer;