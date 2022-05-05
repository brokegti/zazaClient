import axios from 'axios'
import React, { useEffect , useState } from 'react'
import styled from 'styled-components'
import useCheckAuthorized from '../../hooks/useCheckAuthorized'
import Product from './Product'
import SearchBar from './SearchBar'


// card input on cart sideview
//on backdrop have cart items 

const Wrapper = styled.div`
  color: white;
  `
const CategoriesWrapper = styled.div`
  margin: 2rem 3rem;
  width: 100%;
  .categories{
    span{
      color: white; 
      text-align: center;
      width: 100%;
    }
    display: grid;
    grid-template-columns: repeat(7,1fr);
    border: 1px solid reds;
    }
`

const ShopHeader = styled.div`
 display: grid;
 grid-template-columns: repeat(3,1fr);
 place-items: center;
 h1,h2{
   font-size: 2rem;
   width: 100%;
   margin-left: 3rem;
 }
 div{
   display: flex;
   align-items: center;
   h4{
     font-size: 16px;
   }
   select{
     margin-left: 10px;
     background-color: #2c2e34 ;
     color: white;
     font-size: 14px;
     border: none;
     height: 50px;
;
   }
 }

`


const ProductsView = styled.section`
    span {color: white;}
    display: grid;
    grid-template-columns: repeat(1,1fr);
    place-items: center;
    
    
    @media ( min-width: 750px){
      grid-template-columns: repeat(2,1fr);
    }
    @media ( min-width: 950px ){
      grid-template-columns: repeat(3,1fr);
    }
    @media ( min-width: 1250px) { 
      grid-template-columns: repeat(4,1fr);
    }
    
    `
const CategoryWrapper = styled.div`
  margin: 1rem;

  .category_media_wrapper{
    aspect-ratio: 1/1;
    max-width: 100%;
    
    img{
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
  span {
    font-size: 16px;
    color: #333;
    transition: all 0.3s ease;
    &:hover{
      text-decoration: underline dotted;
    }
  }


`

const ShopCategory = ( categoryName , icn ) => { 
  return {
    "name": categoryName,
    "iconSrc": icn
  }
}

const SHOP_CATEGORIES = [
  ShopCategory("Tools","N/A"),
  ShopCategory("Glass","N/A"),
  ShopCategory("Papers","N/A"),
  ShopCategory("Infused","N/A"),
  ShopCategory("Greens","N/A")
]

const Shop = () => {
  useCheckAuthorized()
  const categories = SHOP_CATEGORIES.map( c => (
    <CategoryWrapper key={c.id} onClick={()=>{
      setFilters((current)=>[...current, c.name])
    }}>
      <div className="category_media_wrapper">
        <img src={c.iconSrc} alt={c.name} />
      </div>
      <span>{c.name}</span>
    </CategoryWrapper>
  ))

  const [ products , setProducts ] = useState([])
  const [ loading , setLoading ] = useState(true)
  const [ error , setError ] = useState("")
  const [ sortType , setSortType ] = useState(0)
  const [ filters , setFilters ] = useState([])
  useEffect(()=>{
    const requestData = async () => { 
      try {
        let url = "/api/products"
        console.log(url)
        const response = await axios.get(url)
        console.log(response)
        if(!response.data.success) { 
          setError("Failed to get products")
        }
        const unsorted = JSON.parse(response.data.data)
        console.log(unsorted)



        switch( sortType ){
          case 0: // sort a to z 
            setProducts(unsorted.sort((a,b)=>{
              if(a.name < b.name) return -1
              if(a.name > b.name) return 1
              return 0
            }))
            break;
            case 1: //sort z to a
              setProducts(unsorted.sort((a,b)=>{
                if(a.name > b.name) return -1
                if(a.name < b.name) return 1
                return 0
              }))
              break;
            case 2: //sort $ to $$$
              setProducts(unsorted.sort((a,b)=> a.price-b.price))
              break;
            case 3: //sort $$$ to $
              setProducts(unsorted.sort((a,b)=>b.price-a.price))
              break;
            default: setProducts( unsorted )
              break
        }

        console.log('products',products)
        setLoading(false)
      } catch (e) {
        setError("")
      }
    }
    if(!loading){
      requestData()
    }
  }, [products , loading ])


  return (
    <Wrapper>
     
      {/* header bar: Page Title | Sort |  Search Bar */}
      <ShopHeader>
        <h2>Shop Goodz</h2>
        <div>
          <h4 style={{"textAlign":"center"}}>Sort</h4>
          <select className='sort_select'>
            <option onClick={e => setSortType(e.target.value)} value={0}>A-Z</option>
            <option onClick={e => setSortType(e.target.value)} value={1}>Z-A</option>
            <option onClick={e => setSortType(e.target.value)} value={2}>$-$$$</option>
            <option onClick={e => setSortType(e.target.value)} value={3}>$$$-$</option>
          </select>
        </div>
        <SearchBar setProducts={(val) => setProducts(val)}/>
      </ShopHeader>
     
      {/* categories */}
      <CategoriesWrapper>
        <h3> Filter by categories </h3>
        <div className="categories">
          { categories }
        </div>
      </CategoriesWrapper>

      {/* product grid */}
      <ProductsView>
        {
          error
          ? <span>We are having some trouble getting those products for you</span>
          : products?.map( product => ( 
            <Product id={product.id} key={Date.now() + Math.random() * Date.now()} 
              name={product.name}   
              description={product.name} 
              price={product.price} 
            />
          ))
          
          
        }
      </ProductsView>
    </Wrapper>
            
  )
}

export default Shop