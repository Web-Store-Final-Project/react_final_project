import {React,useEffect,useState} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend} from 'recharts';
export default function Charts() {
    const [data,setData] = useState([]);
    
    useEffect(() => {
        let dataFormated = [];
        const fetchItems = async () => {
        const response = await fetch("/api/orders/orderPerDate");
        const json = await response.json();
        if (response.ok) {
            json.map((date)=>dataFormated.push({"date": date._id,"count": date.count}));
            setData(dataFormated);
        };
    }
    fetchItems();
}, []);


return (
    <BarChart
          width={300}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3 " />
          <XAxis dataKey="date" />
          <YAxis />
          <Legend />
          <Bar dataKey="count" barSize={10} fill="red" />
        </BarChart>
  )
}
