/* eslint-disable prettier/prettier */
import * as actionTypes from '../Constants/Types'

const initialState = {
    reccomendedStationListArtist: [],
    reccomendedStationListSong: [],
    reccomendedStationListSong: [],
    searchedTermListArtist: [],
    searchedTermListSong: [],
    musicSpinner: false,
    errorModal: false
}

export const MusicReducer = (state = initialState, action) => {
    switch (action.type) {
        // ============= GET_RECOMMENDED_STATION ===================
        case actionTypes.GET_RECOMMENDED_STATION_REQUEST:
            return {
                ...state,
                musicSpinner: true,
                errorModal: false
            };
        case actionTypes.GET_RECOMMENDED_STATION_SUCCESS:
            return {
                ...state,
                reccomendedStationListArtist: action.payload.reccomendedStationListArtist,
                reccomendedStationListSong: action.payload.reccomendedStationListSong,
                musicSpinner: false,
                errorModal: false
            };
        case actionTypes.GET_RECOMMENDED_STATION_FAILED:
            return {
                ...state,
                musicSpinner: false,
                errorModal: true
            };
        // ============= GET_SEARCHED_TERM ===================
        case actionTypes.GET_SEARCHED_TERM_REQUEST:
            return {
                ...state,
                musicSpinner: true,
                errorModal: false
            };
        case actionTypes.GET_SEARCHED_TERM_SUCCESS:
            return {
                ...state,
                searchedTermListArtist: action.payload.searchedTermListArtist,
                searchedTermListSong: action.payload.searchedTermListSong,
                musicSpinner: false,
                errorModal: false
            };
        case actionTypes.GET_SEARCHED_TERM_FAILED:
            return {
                ...state,
                musicSpinner: false,
                errorModal: true
            };
        default:
            return state;
    }
};