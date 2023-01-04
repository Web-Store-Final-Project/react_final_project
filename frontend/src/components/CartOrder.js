import {React,useEffect,useState} from 'react'
export default function CartOrder(props) {
    const [total,setTotal] = useState(0.00);
    useEffect(()=>{
        const sum = props.cart.reduce((result,item)=>{
            return parseInt(result) + parseInt(item.price);
        },0.00)
        setTotal(sum);
    },[props.cart])

    return (
    <div>
        <h1>Order Now!</h1>
        <h4>Total: {total}$</h4>
    </div>
  )
}
