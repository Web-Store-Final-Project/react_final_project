import {React,useEffect,useState} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend} from 'recharts';

// const data = [
//   {
//     name: 'Page ',
//     orders_per_day: 12400,
//   },
//   {
//     name: 'Page ',
//     orders_per_day: 1398,
//   },
//   {
//     name: 'Page ',
//     orders_per_day: 9800,
//   },
//   {
//     name: 'Page ',
//     orders_per_day: 3908,
//   },
//   {
//     name: 'Page ',
//     orders_per_day: 4800,
//   },
//   {
//     name: 'Page ',
//     orders_per_day: 3800,
//   },
//   {
//     name: 'Page ',
//     orders_per_day: 4300,
//   },
// ];

export default function Charts() {
    const [data,setData] = useState([]);
    
    
    const getDayFromDate = (date) => {
        const arr = date.split("-");
        return arr[0];
    }
    const getOrderTime = (date) =>{
      const date1= date.split("T")[1];
      const time = date1.split(".")[0];
      const arr = time.split(":");
      return arr[0] + ":" + arr[1];
      
    }
    useEffect(() => {
        const fetchItems = async () => {
        const response = await fetch("/api/orders/orderPerDate");
        const json = await response.json();
        if (response.ok) {
            console.log(json)
            setData(json);
        };
    }
    fetchItems();
}, []);


return (
    <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Legend />
          <Bar dataKey="count" barSize={20} fill="black" />
        </BarChart>
  )
}
