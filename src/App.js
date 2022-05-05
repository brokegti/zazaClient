//routing
import { BrowserRouter , Routes , Route  } from "react-router-dom";


//use cart
import CartContextProvider from "./context/CartContext";

//components
import Landing from "./components/landing/Landing";
import Nav from './components/landing/Nav';
import Shop from './components/shop/Shop';
import Account from './components/user/Account';
import Checkout from "./components/shop/Checkout";

//styled components
import styled from 'styled-components'
const AppStyled = styled.div`
  a{
    text-decoration: none;
    color: #1f66ff;
    transition: all 1s;
    border-bottom: 1px dotted rgba(0,0,0,0.4);
    &:hover{
        border-bottom-style: solid;
        filter: brightness(1.2);
    }
  }

`

const App = () => {
  return (
    <CartContextProvider>
      <AppStyled>
          <BrowserRouter>
              <Nav/>
              <Routes>
                  <Route 
                      exact path="/"
                      element={<Landing />}
                  />
                  <Route 
                    exact path="/shop"
                    element={<Shop />}
                  />
                  <Route 
                    exact path="/account"
                    element={<Account />}
                  />
                  <Route 
                    exact path="/checkout"
                    element={<Checkout />}
                  />

              </Routes>
          </BrowserRouter>
          

      </AppStyled>
    </CartContextProvider>
  )
}




export default App