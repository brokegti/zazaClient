import React from 'react'
import { Link } from 'react-router-dom'
import  styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 30%;
  padding: 10px;
  background-color: #eee;
  border-radius: 5px;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.4);


  @media (max-width: 750px) {
    max-width: unset;
    width: 300px;
  }


`

const ProductNameAndPrice = styled.div`
    margin: 5px 1ch;
    display: grid;
    grid-template-columns: 1fr 100px;
    width: 100%;
    p {
      font-size: 16px;
    }
 
`
const ProductDescription = styled.section`
  p { 
    font-size: 14px;
  }

`


const Product = ({ id,  name , price , description }) => {
  const f_price = `$${(Number(price)/100).toFixed(2)}`
  return (
    <Wrapper key={id}>
      <ProductNameAndPrice>
        <p>{name}</p>
        <p>{price}</p>
      </ProductNameAndPrice>
      <ProductDescription> 
        <p>{description}</p>
        <p>
          <Link to={`/products/${id}`}> View </Link>
        </p>
      </ProductDescription>



    </Wrapper>
  )
}

export default Product