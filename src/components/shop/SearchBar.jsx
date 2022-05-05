import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'




const SearchBar = ({setProducts , setFilters }) => {

  const [ error , setError ] = useState("")
  const [ qry , setQry ] = useState("")
  
  const handleSearch = async () => {
    if(!qry) { 
        setError("No search terms provided")
    }
    try {
        const response = await axios.post('/api/products/search', { 
            qry: qry
        })
        if(!response.data.success){
            setError("Failed to find any items with that search")
        }
        setProducts( response.data.data )

    } catch (error) {
        setError(JSON.stringify(error,null,4))
    }

  }

  return (
    <Wrapper>
        <input type='text' value={qry} onChange={e=>setQry(e.target.value)} placeholder="search goodz" />
        <button onClick={e=>handleSearch()}>
            <FaSearch size={22}/>
        </button>
        { error && <span className="search_error_message">{error}</span>}
    </Wrapper>
  )
}


const Wrapper = styled.div`
    border-radius: 10px;

    width: 100%;
    max-width: 400px;
    display: grid ;
    grid-template-columns: 1fr calc(70px+2ch);
    place-items: center;
    input{
        width: 100%;
        border-radius: 10px;
        background-color: #2c2e34 ;
        border: none;
        padding: 10px;
        font-size: 14px;
        height: 5ch;
    }
    button{ 
        margin-left: 2ch;
        height: 70px; width: 70px;
        display: flex;
        justify-content: center; align-items: center;
        padding: 5px;
        border: 0;
        border-radius: 0;
        transition: all 0.5s ease-in;
        background-color: #2c2e34;
        color: white;
        &:hover{
            border-radius: 100%;
            filter: brightness(1.5);
            color: aquamarine;
        }
    }

`

export default SearchBar