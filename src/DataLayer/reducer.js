
export const initialState = {
    user: {
        userData: null,
        userAuthData: null
    },
    products: [],
    category: []
}
const reducer = (state, action) => {
    var type = action.type
    switch (type) {
        case "SET_USER":
            return { ...state, user: { ...state.user, userAuthData: action.data } }
        case "SET_CATE_LIST":
            return { ...state, category: action.data }
        case "SET_PRODUCTS":
            return { ...state, products: action.data }
        case "SET_USER_DATA":
            return { ...state, user: { ...state.user, userData: action.data } }
        case "SET_USER_CART":
            return { ...state, user: { ...state.user, userCart: action.data } }
        case "SET_FARMER_DATE":
            return {...state, farmerData:action.data}
        case "SET_CROPS_LIST":
            return {...state, crops:action.data}
        case "SET_ITEM_TO_VERIFY":
            return {...state, itemToVerify:action.data}
        default:
            return state
    }
}
export default reducer
