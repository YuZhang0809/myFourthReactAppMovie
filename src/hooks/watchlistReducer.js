export const initialState = []
export function watchlistReducer(state, action){
switch (action.type) {
    case "ADD": 
        if (state.some(movie => movie.id === action.payload.id)) {
            return state;
        }
        return [...state, action.payload];
    case "REMOVE":
        return state.filter(movie => movie.id !== action.payload);
    case "CLEAR":
        return []
    case "INIT":
        return [...action.payload]
    default:
        return state;
}
}