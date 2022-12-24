import { useItemsContext } from "../hooks/useItemsContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const ItemDetails = ({item})=>{
    const {dispatch} = useItemsContext()

    const handleClick = async()=>{
        const response = await fetch('/api/items/' + item._id,{
            method: 'DELETE'
        })
        const json = await response.json()
        
        if(response.ok){
            dispatch({type:'DELETE_ITEM',payload: json})
        }
    }

    return(
        <div className="item-details">
            <h4>{item.title}</h4>
            <p><strong>Description: </strong>{item.description}</p>
            <p><strong>Price: </strong>{item.price}$</p>
            <img className="imgItem" src = {item.imgPath}></img>
            <p>uploaded {formatDistanceToNow(new Date(item.createdAt),{addSuffix:true})}</p>
            <span onClick={handleClick} >
                <img className="deleteIcon" src="https://cdn-icons-png.flaticon.com/512/216/216760.png"></img>
            </span>
        </div> 
    );
}

export default ItemDetails