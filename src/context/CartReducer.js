const TAX_RATE = 0.081;
export const sumItems = (cartItems) => {
 return {
  itemCount: cartItems.reduce((total, prod)=>(
   total + prod.quantity
  ), 0),
  subtotal: cartItems.reduce((total, prod)=> (
   total + (Number(prod.price) * prod.quantity) 
  ), 0),
  taxAmount: cartItems.reduce((total, prod)=> (
    total + (Number(prod.price) * prod.quantity) 
   ), 0) * TAX_RATE,
  grandTotal: cartItems.reduce((total, prod)=> (
    total + (Number(prod.price) * prod.quantity) 
   ), 0) * (1 + TAX_RATE),
 }
}


const cartReducer = (state, action) => {
 switch(action.type){
  case "ADD_TO_CART":
    if(!state.cartItems.find(item=> item._id === action.payload._id)){
    state.cartItems.push({
     ...action.payload,
     quantity: 1,
    })
   }
    return {
     ...state, 
     cartItems: [...state.cartItems], 
     ...sumItems(state.cartItems)  
    }
    case "SETQTY":
      console.log(action.payload.product)
      state.cartItems[0].quantity = action.payload.num;
      return {
        ...state, 
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems)
      }

    case "REMOVE": 
    const newCartItems = state.cartItems.filter(item => item._id !== action.payload._id);
    return{
      ...state, 
      cartItems: [...newCartItems],
      ...sumItems(newCartItems),  
    }

    case "CLEAR": 
      localStorage.removeItem('cart');
      return{
        ...state, 
        cartItems: [],
        ...sumItems(state.cartItems)
      }

  default: return state;
 }
}
export default cartReducer;