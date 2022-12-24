import { useEffect, useState } from "react"
import { Form } from "react-router-dom"
import { useItemsContext } from "../hooks/useItemsContext";


const ItemForm = ()=>{
    const {dispatch} = useItemsContext()

    const[title,setTitle] = useState('')
    const[description,setDescription] = useState('')
    const[price,setPrice] = useState('')
    const[imgPath,setImgPath] = useState('')
    const[error,setError] = useState(null)
    const[emptyFields,setEmptyFields] = useState([])
    // const[date,setDate] = useState('')

    const handleSubmit = async (event) =>{
        event.preventDefault()

        const item = {title,description,price,imgPath}

        const response = await fetch('/api/items',{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setEmptyFields([])
            setError(null)
            setTitle('')
            setDescription('')
            setPrice('')
            console.log("New item added")
            dispatch({type:'CREATE_ITEM',payload:json})
        }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new Item</h3>

            <label>Item Title:</label>
            <input
             type="text"
             onChange={(event)=>setTitle(event.target.value)}
             value={title}
             className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Item Description:</label>
            <input
             type="text"
             onChange={(event)=>setDescription(event.target.value)}
             value={description}
             className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Item Price:</label>
            <input
             type="number"
             onChange={(event)=>setPrice(event.target.value)}
             value={price}
             className={emptyFields.includes('price') ? 'error' : ''}
            />

            <label>Item image(URL):</label>
            <input
             type="text"
             onChange={(event)=>setImgPath(event.target.value)}
             value={imgPath}
             className={emptyFields.includes('imgPath') ? 'error' : ''}
            />

            <button>Add Item</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ItemForm