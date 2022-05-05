
import React , { useState , useEffect , useContext } from 'react'
import { CartContext } from '../../context/CartContext'

import CheckoutForm from '../shop/CheckoutForm'
import styled from "styled-components"

const Wrapper = styled.div`
    @media (max-width: 650px){
        .cart_sidebar { 
            width: 100vw;
        }
    }
    #cart_link {
            margin-left: 2rem;
            padding: 10px 20px;
            font-size: 18px;
            transition: all 0.3s ease-in;
            text-decoration: none;
            color: #fff;
            background-color: #333;
            border-radius: 4px;

            &:hover{
                background-color: #c9c9c9;
                border-radius: 10px;
                color: #000;
                box-shadow: 1px 1px 4px rgba(0,0,0,0.4);
            }
    }
    #cart-label {
        background-color: transparent;
        border: none;
        font-size: 18px;
        color: #fff;
        padding: 0;

    }
    .cart_sidebar{ 
        overflow: scroll;
        position: fixed;
        top: 0;
        right: 0;
        max-height: 100vh;
        width: 30vw;
        min-width: 300px;
        transition: all 0.3s ease-in;
        background-color: #eee;
        transform: translateX(100vw);
        z-index: 4;
        color: #000;
    }
    .cart_sidebar.show{
        transform: translateX(0);
    }
    .backdrop {
        display: none;
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vw;
        opacity: 0;
        background-color: rgba(0,0,0,0.6);
        z-index: 2;
        transition: all 0.2s ease-in;
    }
    .backdrop.show{
        display: block;
        filter: blur(100px);
        opacity: 1;
    }
    #cart_bar{
        display: flex;
        flex-direction: column;
        align-items: center;
        h1{
            width: 80%;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #333;
        }
        .items { 
            padding: 10px;
            max-height: 400px;
            width: 80%;
            margin-bottom: 1rem;
            border-bottom: 1px solid #333;
        }
    }
    

`



const CartLink = () => {

    const { addToCart , cartItems } = useContext(CartContext)
    const [ items , setItems ] = useState([])
    const [ show , setShow ] = useState(false)
    const [ loading , setLoading ] = useState(true)

    const [ cartClass , setCartClass ] = useState([])
    const [ backdropClass, setBackdropClass ] = useState([])
    
    //hide the sidebar
    useEffect(()=>{
        if(show){
            setCartClass(['cart_sidebar', 'show'])
            setBackdropClass(['backdrop', 'show'])
            
        } else { 
            setCartClass(['cart_sidebar'])
            setBackdropClass(['backdrop'])
        }
    },[show])
    

 const doCheckout = ( e ) => {
     e.preventDefault()


 }


  return (
    <Wrapper>
        <div id="cart_link">
            <button onClick={()=>setShow(true)} id="cart-label">Cart </button>
        </div>
        <div className={backdropClass.join(" ")} onClick={()=>{ setShow(false)}}/>
        <div className={cartClass.join(" ")}>
            <div id="cart_bar">
               <CheckoutForm />
            </div>
        </div>
       
        
    </Wrapper>
  )
}

export default CartLink