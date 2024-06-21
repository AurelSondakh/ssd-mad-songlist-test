import * as ActionTypes from '../Constants/Types';

export const GetSearchedTerm = (term, entity) => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.GET_SEARCHED_TERM_REQUEST
        });
        console.log('ENTITY IN REDUX', entity)
        const controller = new AbortController();
        const { signal } = controller;
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 15000);
        try {
            if (entity === 'musicArtist') {
                const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=${entity}&limit=30`, {
                    method: "GET",
                    redirect: "follow",
                    signal
                });
                clearTimeout(timeoutId);
                console.log('searchedTermListArtist: ', response)
                searchedTermListArtist = await response.json()
                searchedTermListSong = []

                if (!response.ok) {
                    dispatch({
                        type: ActionTypes.GET_SEARCHED_TERM_FAILED,
                        payload: { searchedTermListArtist, searchedTermListSong }
                    });
                }

                dispatch({
                    type: ActionTypes.GET_SEARCHED_TERM_SUCCESS,
                    payload: { searchedTermListArtist, searchedTermListSong }
                });
            } else if (entity === 'song' || entity === 'musicVideo') {
                const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=${entity}&limit=30`, {
                    method: "GET",
                    redirect: "follow",
                    signal
                });

                clearTimeout(timeoutId);
                console.log('searchedTermListSong: ', response)
                searchedTermListArtist = []
                searchedTermListSong = await response.json()

                if (!response.ok) {
                    dispatch({
                        type: ActionTypes.GET_SEARCHED_TERM_FAILED,
                        payload: { searchedTermListArtist, searchedTermListSong }
                    });
                }

                dispatch({
                    type: ActionTypes.GET_SEARCHED_TERM_SUCCESS,
                    payload: { searchedTermListArtist, searchedTermListSong }
                });
            } else {
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
                console.log('searchedTermListArtist: ', data1Response)
                console.log('searchedTermListSong: ', data2Response)
                searchedTermListArtist = await data1Response.json()
                searchedTermListSong = await data2Response.json()

                if (!data1Response.ok || !data2Response.ok) {
                    dispatch({
                        type: ActionTypes.GET_SEARCHED_TERM_FAILED,
                        payload: { searchedTermListArtist, searchedTermListSong }
                    });
                }

                dispatch({
                    type: ActionTypes.GET_SEARCHED_TERM_SUCCESS,
                    payload: { searchedTermListArtist, searchedTermListSong }
                });
            }
        } catch (error) {
            console.error("ERROR", error.message);
            dispatch({
                type: ActionTypes.GET_SEARCHED_TERM_FAILED,
                error: error.message,
            });
        }
    }
}


