// Imports
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



// Export: addComment();
export const addComment = (campsiteId, rating, author, text) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    campsiteId: campsiteId,
    rating: rating,
    author: author,
    text: text
  }
});


// Export: fetchCampsites();
export const fetchCampsites = () => dispatch => {
  dispatch(campsitesLoading());

  return fetch( baseUrl + 'campsites' )
    .then( response => response.json() )
    .then( campsites => dispatch(addCampsites(campsites)) );
};

//----------------EXPORT FUNCTIONS---------------------

// campsitesLoading();
export const campsitesLoading = () => ({
  type: ActionTypes.CAMPSITES_LOADING
});


// campsitesFailed();
export const campsitesFailed = (errMess) => ({
  type: ActionTypes.CAMPSITES_FAILED,
  payload: errMess
});


// addCampsites();
export const addCampsites = (campsites) => ({
  type: ActionTypes.ADD_CAMPSITES,
  payload: campsites
});


// fetchComments();
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)));
};

// commentsFailed()
export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess
});

// addComments();
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

// fetchPromotions();
export const fetchPromotions = () => (dispatch) => {
  dispatch(promotionsLoading());

  return fetch( baseUrl + 'promotions' )
    .then(response => response.json())
    .then(promotions => dispatch(addPromotions(promotions)));
};

export const promotionsLoading = () => ({
  type: ActionTypes.PROMOTIONS_LOADING
})

export const promotionsFailed = errMess => ({
  type: ActionTypes.PROMOTIONS_FAILED,
  payload: errMess
})

export const addPromotions = (promotions) => ({
  type: ActionTypes.ADD_PROMOTIONS,
  payload: promotions
})