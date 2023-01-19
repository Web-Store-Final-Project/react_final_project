import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
export default function CartOrder(props) {
    const [total,setTotal] = useState(0);  
    const navigate = useNavigate();

    useEffect(()=>{
        const sum = props.cart.reduce((result,item)=>{
            return parseInt(result) + parseInt(item.price);
        },0)
        setTotal(sum);
    },[props.cart])
    const addOrder = (e) => {
        // e.preventDefault();
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const date1 = day+"-"+month+"-"+year;
        const time = hours + ":" + minutes; 
        const requestOptions = {
            method: 'POST',
            crossDomain: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: props.email, date: date1, time:time,cart: props.cart,totalPrice:total})
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
            { total > 0 && (
                <div>
                    <h1>Order Now!</h1>
                    <h4>Total: {total}$</h4>
                </div>
            )
            }

            { total > 0 && 
                <button className="btnOrder" onClick={addOrder}>Order</button>
            }
        </form>
    </div>
  )
}
