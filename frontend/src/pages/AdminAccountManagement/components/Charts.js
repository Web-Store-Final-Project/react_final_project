import {React,useEffect,useState} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend} from 'recharts';
export default function Charts() {
    const [data,setData] = useState([]);
    

    const getDateFormated = (date) => {
        const arr = date.split("T");
        return arr[0];
    }
    const getOrderTime = (date) =>{
      const date1= date.split("T")[1];
      const time = date1.split(".")[0];
      const arr = time.split(":");
      return arr[0] + ":" + arr[1];
      
    }
    useEffect(() => {
        let dataFormated = [];
        const fetchItems = async () => {
        const response = await fetch("/api/orders/orderPerDate");
        const json = await response.json();
        if (response.ok) {
            json.map((date)=>{
                dataFormated.push({"date": date._id,"count": date.count})
             })
            console.log(dataFormated);
            setData(dataFormated);
        };
    }
    fetchItems();
}, []);


return (
    <BarChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="date" />
          <YAxis />
          <Legend />
          <Bar dataKey="count" barSize={10} fill="black" />
        </BarChart>
  )
}
