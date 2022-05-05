import { useState , useEffect} from 'react'
import axios from 'axios'
import { GET_LOCALIZED } from '../../helpers/local'


// path is /products/:id
const productId = window.location.pathname.split("/")[2]
const Wrapper = styled.div`

`

const ProductWrapper = styled.section`
`

const ActionButton = styled.button`

`
const QtyInput = styled.input`
`
const ProductPage = () => {

    const [ loading , setLoading ] = useState( true ) 
    const [ product , setProduct ] = useState( null )
    const [ error , setError ] = useState( "" )
    const [ id , setId ] = useState("")
    const [ qty , setQty ] = useState(1)
    useEffect(()=>{
        setId(productId)
    })


    const _fetch =  (id) => { 
        return new Promise(( resolve , reject ) => { 
            axios.get(`/api/products/${id}`)
                .then(response=>{
                    if( response.data.success){
                        resolve(response.data.data)
                    } else { 
                        reject( response.data )
                    }
                })
        })
    }

    const details = useMemo( async ()=> {
        try { 
            const response = await _fetch(id)
            return response 
        } 
       catch ( e ) { 
           setError( e )
       }
   } , [id])

   console.log( details )
   const f_price = `$${(details.price / 100).toFixed(2)}`


  return (
    <Wrapper> 
        {
            error ? <span>{error}</span>
            : loading ? <div className="loader"/> 
            : details ? <ProductWrapper>
                <div className="left">                    
                    <div className="media_wrapper">
                        <img src={details.imageSrc} alt={details.name} />
                    </div>
                    <div className="name_price">
                        <p>{details.name}</p>
                        <p>{f_price}</p>
                    </div>
            

                </div>
                <div className="right">
                    <article className="product_description">
                        <h2>About {details.name} </h2>
                        <p>{details.description}</p>
                    </article>
                    <div className="actions">
                    {
                        GET_LOCALIZED('cart').indexOf(id) === -1
                        ? <ActionButton onClick={()=>{ alert("add to cart logic")}}>
                            Add To Cart
                        </ActionButton>  
                        : (
                            <>
                            <ActionButton onClick={()=>{ alert("remove cart logic")}}>
                                Remove From Cart 
                            </ActionButton>
                            <h2>Update Quantity</h2>
                            <QtyInput type="number" value={qty} onChange={e=>setQty(e.target.value)}/>
                            </>

                        )
                    }
                    </div>

                </div>
            </ProductWrapper> : null
        }
    </Wrapper>



   
  )
}

export default ProductPage