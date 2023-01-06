import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
export default function CartOrder(props) {
    const [total,setTotal] = useState(0);  
    const navigate = useNavigate();
    const getDateCorrect = (date)=>{
        const date1= date.split("T")[0];
        const arr = date1.split("-");
        return arr[2] + "-" + arr[1] + "-" + arr[0];
    }
    const getOrderTime = (date) =>{
      const date1= date.split("T")[1];
      const time = date1.split(".")[0];
      const arr = time.split(":");
      return arr[0] + ":" + arr[1]; 
    }
    useEffect(()=>{
        const sum = props.cart.reduce((result,item)=>{
            return parseInt(result) + parseInt(item.price);
        },0)
        setTotal(sum);
    },[props.cart])
    const addOrder = (e) => {
        // e.preventDefault();
        let date = new Date();
        const requestOptions = {
            method: 'POST',
            crossDomain: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: props.email, date: date,cart: props.cart,totalPrice:total})
        };
        fetch('/api/orders/', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            props.setAmountInCart(0)
            props.setCart([]);
            navigate("/")
        .catch((err)=>{
            console.log(err);
        });
    }
    return (
    <div>
        <form>
            <h1>Order Now!</h1>
            <h4>Total: {total}$</h4>
            <button className="btnOrder" onClick={addOrder}>Order</button>
        </form>
    </div>
  )
}
