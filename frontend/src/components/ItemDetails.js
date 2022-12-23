
const ItemDetails = ({item})=>{
    return(
        <div className="item-details">
            <h4>{item.title}</h4>
            <p><strong>Description: </strong>{item.description}</p>
            <p><strong>Price: </strong>{item.price}$</p>
            <img src = {item.imgPath}></img>
        </div> 
    );
}

export default ItemDetails