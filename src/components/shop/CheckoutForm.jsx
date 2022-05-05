import {useEffect, useState} from 'react'
import { FaCheckSquare, FaSquare } from 'react-icons/fa'
import styled from 'styled-components'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    .city_state_zip { 
        display: grid;
        grid-template-columns: repeat(3,1fr);
    }
    .exp_cvv{
        display: flex;
        justify-content: flex-start;
        width: 100%;
        input{
            width: 100%;
        }
    }
    input { 
        margin: 2px 5px;
        width: 99%;
        font-size: 14px;
        padding: 5px;
        border-radius: 6px;
        border: none;
        margin-bottom: 10px;
    }
    h1{
        width: 90%;

    }
    h2{
        width: 100%;
    }
    .submitBtn {
        margin-top: 2rem;
        background-color: #333;
        color: white;
        display: block;
        width: 90%;
        text-align: center;
        margin: auto;
        padding: 10px;
    }

    .prompt_billing_address{
        margin-bottom: 1rem;
    }

`

const CheckoutForm = ({n,total}) => {
    
    const doCheckout = (e) => { 
        e.preventDefault()
        return new Promise(( res , rej )=> { 

        })

    }

    


    const [name , setName ] = useState("")
    const [email, setEmail] = useState("")
    const [ sameAddresses , setSameAddresses] = useState(true);
    const [addressLine1, setAddressLine1 ] = useState("")
    const [addressLine2, setAddressLine2 ] = useState("")
    const [ city, setCity] = useState("")
    const [ state, setState ] = useState("")
    const [ zip, setZip] = useState("")
    
    //only if diff address
    const [addresssLine1Pay, setAddressLine1Pay ] = useState("")
    const [addresssLine2Pay, setAddressLine2Pay] = useState("")
    const [ cityPayment, setCityPayment] = useState("")
    const [ statePayment, setStatePayment ] = useState("")
    const [ zipPayment, setZipPayment] = useState("")
    
    useEffect(()=>{
        if(sameAddresses){
            setAddressLine1Pay(addressLine1)
            setAddressLine2Pay(addressLine2)
            setCityPayment(city)
            setStatePayment(state)
            setZipPayment(zip)

        }
    },[sameAddresses])
    





  return (
    <Form action="" onSubmit={doCheckout}>
<h1>Checkout </h1>

<h2>Contact Information</h2>
<input type="text" 
    placeholder='enter your name * '
    value={name} onChange={e=>setName(e.target.value)}
/>
<input type="text" 
    placeholder='enter your email *'
    value={email} onChange={e=>setEmail(e.target.value)}
/>

<h2>Shipping Information</h2>
<input type="text" 
    placeholder='address line 1 *'
    value={addressLine1} onChange={e=>setAddressLine1(e.target.value)}
/>
<input type="text" 
    placeholder='address line 2'
    value={addressLine2} onChange={e=>setAddressLine2(e.target.value)}
/>


<div className="city_state_zip">
    <input type="text" 
        placeholder='city'
        value={city} onChange={e=>setCity(e.target.value)}
    />
    <input type="text" 
        placeholder='state'
        value={state} onChange={e=>setState(e.target.value)}
    />
    <input type="text" 
        placeholder='zip/postal code'
        value={zip} onChange={e=>setZip(e.target.value)}
    />
</div>

<h2>Payment Information</h2>
<input 
    type={"text"}
    placeholder={'enter your card number'}
/>
<div className="exp_cvv">
    <input type="text" placeholder='EXP' />
    <input type="text" placeholder='CVV' />
</div>
<div className='prompt_billing_address'>
{
    sameAddresses ? (
        <span><FaCheckSquare onClick={()=>{
            setSameAddresses(false)
        }}/> Using same shipping and billing address</span>
            
    ) : ( 
        <>
        <span><FaSquare onClick={()=>{
            setSameAddresses(true)
        }}/> Use same shipping and billing address? </span><br/>
            <br/>
            <h2>Billing Address</h2>
            <input type="text" 
                placeholder='address line 1 *'
                value={addressLine1} onChange={e=>setAddressLine1(e.target.value)}
            />
            <input type="text" 
                placeholder='address line 2'
                value={addressLine2} onChange={e=>setAddressLine2(e.target.value)}
            />
        <div className="city_state_zip">
            <input type="text" 
                placeholder='city'
                value={city} onChange={e=>setCity(e.target.value)}
            />
            <input type="text" 
                placeholder='state'
                value={state} onChange={e=>setState(e.target.value)}
            />
            <input type="text" 
                placeholder='zip/postal code'
                value={zip} onChange={e=>setZip(e.target.value)}
            />
        </div>
        </>
    )
}

</div>


{
    n > 0 ?
    <button className="submitBtn" type='submit'>Confirm Payment of $xx.xx</button>
    :  <span className="submitBtn" >
        Add Items To Checkout
    </span>
}



</Form>
  )
}

export default CheckoutForm