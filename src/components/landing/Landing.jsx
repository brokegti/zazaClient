import { useEffect, useState } from 'react'

//requests 
import axios from 'axios'

//session storage util
import { GET_SESSIONIZED, SESSIONIZE } from '../../helpers/sessions'

//routing
import {Link} from 'react-router-dom'


//styled components
import styled from 'styled-components'
const Hero = styled.section`
    p{
        max-width: 50ch;
        font-size: 1.5rem;
        color: white;
        margin-top: 5rem;
    }

`

const Wrapper = styled.div`
    margin: 2rem;
    display: grid;
    grid-template-columns: 55vw 1fr;
    form{
        padding: 20px;
        background-color: #eee;
        height: 100%;
        .inputs_wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            input{
  width: 100%;
  margin-bottom: 2ch;
  font-size: 1.2rem;
  padding: 5px 10px;

}

  
        }
    }
    button[type="submit"]{
        padding: 10px 2ch;
        font-size: 18px;
        width: 80%;
        background-color: gainsboro;
        border: none;
        border-radius: 0px;
        transition: all 0.35s ease-in-out;
        &:hover {
            border-radius: 15px;
            background-color: #171717;

            box-shadow: 1px 1px 4px rgba(0,0,0,0.4);
            color: white;
        }
    }
    @media ( max-width: 900px ){
        display: flex;
        flex-direction: row-reverse;
        
        #hero > p { 
            font-size: 1.2rem;
        }
        form { 
            padding: 10px;
        }
    }
    @media (max-width: 800px) {
        flex-direction: column-reverse;
        align-items: center;
    }
`

const Right = styled.section`
    margin-top: 2rem;
    background-color: #eee;

`

const Disclaimer = styled.span`
    color: #333;
    font-size: 14px;
    margin: 0 20px;
    margin-bottom: 4ch;
`

const LearnLink = styled.span`
    a {
        &:hover { 

        }
    }
`

const ForgotMsg = styled.span`
    margin-top: 2rem;
    text-align: center;
`


const Landing = () => {
    //form state
    const [ username , setUsername ] = useState("")
    const [ email , setEmail ] = useState("")
    const [ password , setPassword ] = useState("")

    useEffect(()=>{ //if signed in push to shop
        if(GET_SESSIONIZED('auth_tkn')){
            window.location.pathname = '/shop'
        }
    },[])
    const handleSubmit = async e => {
        e.preventDefault()
        const options = {
            url: 'http://127.0.0.1:5000/api/users',
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            data: {
                email , password
            },
            mode: "cors"

        }
        
        const response = await axios.request(options)
        console.log(response)
        if( response.data.data.token ){
            SESSIONIZE('auth_tkn', response.data.data.token)
            setTimeout(()=>{
                window.location.pathname = "/shop"
            },2000)
        }

    } 
   const slot = (
    <section id="document">
        <h2> Start Shopping Today! </h2>
        <form action='' onSubmit={handleSubmit}>
            <div className="inputs_wrapper">
                <input 
                    type="email" name="email" id="email" 
                    value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="Enter an email"
                />
                <input 
                    type="password" name="password" id="password" 
                    value={password} onChange={e=>setPassword(e.target.value)}
                    placeholder="Enter a password"
                />
                <Disclaimer>
                    * By clicking the button below, you are consenting to Zaza Goods' <Link to='/privacy-policy'>privacy policy</Link> and <Link to="/terms">Terms and Conditions.</Link>
                </Disclaimer>
                <button type="submit"> Get Started </button>
                <ForgotMsg>Forgot your password? Go <Link to="/forgot"> here</Link> to reset it.</ForgotMsg>
            </div>

        </form>


    </section>
   );


    //render page
    return (
    <Wrapper>
        <Hero id="hero">
            <p>
                Zaza Goods &copy; aims to revolutionize the cannabis industry by providing users with an all online dispensary service.
            </p>
        </Hero>
        <Right>
            {slot}
        </Right>
      
    </Wrapper>
  )
}

export default Landing
