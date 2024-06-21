/* eslint-disable prettier/prettier */
import * as actionTypes from '../Constants/Types'

const initialState = {
    reccomendedStationListArtist: [],
    reccomendedStationListSong: [],
    musicSpinner: [],
    errorModal: []
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
    default:
      return state;
  }
};