import {React,useEffect} from 'react'

export default function CartOrder(props) {
    useEffect(()=>{
        const sum = props.cart.reduce((result,item)=>{
            return result + item.price
        },0)
        props.setTotal(sum);
    },)
 
    return (
    <div>
        <h1>Order Now!</h1>
        <h4>Total: {props.total}$</h4>
    </div>
  )
}
