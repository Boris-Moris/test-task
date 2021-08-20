import {booksAPI} from "../DAL/API";

const SET_BOOKS = "SET_BOOKS";
const SET_BOOK = "SET_BOOK";
const SET_ERROR = "SET_ERROR";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const REMOVE_BOOKS = "REMOVE_BOOKS";
const REMOVE_BOOK = "REMOVE_BOOK";

const defaultState = {
    books: [],
    book: {},
    totalBooks: 0,
    isFetching: false,
    isFetchError: false,
}

export default function reposReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_BOOKS:
            return {
                ...state,
                books: [...state.books, ...action.payload.items],
                totalBooks: action.payload.totalItems,
            }

        case SET_BOOK:
            return {
                ...state,
                book: {...action.payload},
            }

        case SET_ERROR:
            return {
                ...state,
                isFetchError: action.payload,
            }

        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload,
            }

        case REMOVE_BOOKS:
            state.books.length = 0;
            state.totalBooks = 0;
            return state;

        case REMOVE_BOOK:
            state.book = {};
            return state;

        default:
            return state;
    }
}

export const setBooks = (books) => ({type: SET_BOOKS, payload: books});
export const setBook = (book) => ({type: SET_BOOK, payload: book});
export const setError = (bool) => ({type: SET_ERROR, payload: bool});
export const toggleFetch = (process) => ({type: SET_IS_FETCHING, payload: process});
export const removeBooks = () => ({type: REMOVE_BOOKS});
export const removeBook = () => ({type: REMOVE_BOOK});

export const getMoreBooks = (books, category, apiKey, index, type) => {
    return async (dispatch) => {
        dispatch(toggleFetch(true));
        let data = await booksAPI.getMoreBooks(books, category, apiKey, index, type);
        dispatch(toggleFetch(false));
        dispatch(setBooks(data));
    }
}

export const getNewBooks = (books, category, apiKey, index, type) => {
    return async (dispatch) => {
        dispatch(toggleFetch(true));
        dispatch(removeBooks());
        let data = await booksAPI.getBooks(books, category, apiKey, index, type);
        dispatch(toggleFetch(false));
        dispatch(setBooks(data));
    }
}

export const getBook = (id, apiKey) => {
    return async (dispatch) => {
        dispatch(toggleFetch(true));
        dispatch(removeBook());
        let data = await booksAPI.getBook(id, apiKey);
        dispatch(toggleFetch(false));
        if (typeof data !== "object") {
            dispatch(setError(true));
        } else {
            dispatch(setBook(data));
        }
    }
}