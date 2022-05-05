import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CartLink from '../cart/CartLink'

import { SESSIONIZE , GET_SESSIONIZED } from '../../helpers/sessions'


const Bar = styled.div`
    height: 10vh;
    padding: 10px 20px;
    color: white;
    width: 100%;
    display: grid;
    grid-template-columns: 40vw 1fr;
    header{
        display: grid;
        grid-template-columns:1fr;
        h1{
            width: 100%;
            text-align: left;
            padding-left: 12px;
        }
        #logo { 
            width: 75px;
            height: 75px;
        }
        #logo > img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }
    .links{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        a{
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
    }

    @media (max-width: 675px) {
        grid-template-columns: repeat(1,1fr);
        
        height: 12vh;
        header > h1 { 
            text-align: center;
            margin-bottom: 10px;
        }
        .links{
            margin-top: 10px;
            justify-content: space-evenly;
        }
    }

`



const Nav = () => {
  return (
    <Bar>
        <header>
            {/* <div id="logo"></div> */}
            <h1>Zaza Goods </h1>
        </header>
        <div className="links">
            <Link to='/shop'>Shop</Link>
            <CartLink/>
            <Link to='/Account'>Account</Link>

        </div>
    </Bar>
  )
}

export default Nav