import styled from 'styled-components';
import { GET_LOCALIZED, LOCALIZE } from '../../helpers/local';
import { useState , useEffect } from 'react'
import { updateFirst } from '../../helpers/etc';

const Wrapper = styled.div`


`

const Thumbnail = styled.div`

`

const Name = styled.span`
  
`

const Price = styled.span`
  
`

const Qty = styled.span`
  
`



const removeFromCart = (id)=>{
  let cart = [...GET_LOCALIZED('cart')]
  cart.splice(cart.indexOf(item => item.id == id), 1)
  LOCALIZE('cart', cart)
}

const updateQty = ( id , newQty) => { 
  let cart = [...GET_LOCALIZED('cart')];
  updateFirst(cart , item => item.id == id , { qty: newQty })
  LOCALIZE('cart', cart)
}

const getQty = (id) => { 
  let cart = [...GET_LOCALIZED('cart')];
  const match = cart.find(item => item.id === id )
  return match.qty
}



const CartItem = ({item}) => {
  const [ qty , setQty ] = useState(getQty(item.id))
  useEffect(( )=>{
    updateQty(item.id,qty)
  }, [qty])
  

  const _item = {
    _id: "dkajf32je9vjsofvoaejwao",
    name: "Self-Cleaning Super-Cooled Bong",
    description: "Are you tired of constantly having to clean your bong, or risking your mouth to the assault of bong water? This bong uses a special filtration technology to prevent any ashy particles from ending up in the water, in fact, the water does not come into direct contact with any smoke or ash. The triple percolators surrounded by the cool water will let you fill your lungs with a soothing, filtered hit. ",
    imageSrc: "https://media.istockphoto.com/photos/top-view-of-a-crystal-bong-with-marijuana-ready-to-smoke-a-tin-can-picture-id1095118622?b=1&k=20&m=1095118622&s=170667a&w=0&h=8ILreLufGNaou5IbVhbUMIehoM_ltQi1MgAZOVi6HuU=",
    inStock: 10,
    price: 9999,

  }
  return (
    <Wrapper>
      <Thumbnail>
        <img src={_item.imageSrc} alt={_item.name} />
      </Thumbnail>
      <Name>{_item.name}</Name>
      <Price>$ {(_item.price/100).toFixed(2)}</Price>
      <Qty>
        <input type="Number" value={qty} onChange={e=>setQty(e.target.valueAsNumber)} />
      </Qty>
      
  
      
    </Wrapper>
  )
}

export default CartItem