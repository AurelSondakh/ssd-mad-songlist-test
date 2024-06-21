import * as ActionTypes from '../Constants/Types';

export const GetRecommendedStation = (term) => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.GET_RECOMMENDED_STATION_REQUEST
        });
        const controller = new AbortController();
        const { signal } = controller;
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 8000);
        try {
            const [data1Response, data2Response] = await Promise.all([
                fetch(`https://itunes.apple.com/search?term=${term}&entity=musicArtist&limit=30`, {
                    method: "GET",
                    redirect: "follow",
                    signal,
                }),
                fetch(`https://itunes.apple.com/search?term=${term}&entity=musicTrack&limit=30`, {
                    method: "GET",
                    redirect: "follow",
                    signal,
                }),
            ]);

            clearTimeout(timeoutId);
            console.log('reccomendedStationListArtist: ', data1Response)
            console.log('reccomendedStationListSong: ', data2Response)
            const reccomendedStationListArtist = await data1Response.json()
            const reccomendedStationListSong = await data2Response.json()

            if (!data1Response.ok || !data2Response.ok) {
                dispatch({
                    type: ActionTypes.GET_RECOMMENDED_STATION_FAILED,
                    payload: {reccomendedStationListArtist, reccomendedStationListSong}
                });
            }

            dispatch({
                type: ActionTypes.GET_RECOMMENDED_STATION_SUCCESS,
                payload: {reccomendedStationListArtist, reccomendedStationListSong}
            });
        } catch (error) {
            console.error("ERROR", error.message);
            dispatch({
                type: ActionTypes.GET_RECOMMENDED_STATION_FAILED,
                error: error.message,
            });
        }
    }
}


