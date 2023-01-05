import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend} from 'recharts';
const data = [
  {
    name: 'Page ',
    orders_per_day: 12400,
  },
  {
    name: 'Page ',
    orders_per_day: 1398,
  },
  {
    name: 'Page ',
    orders_per_day: 9800,
  },
  {
    name: 'Page ',
    orders_per_day: 3908,
  },
  {
    name: 'Page ',
    orders_per_day: 4800,
  },
  {
    name: 'Page ',
    orders_per_day: 3800,
  },
  {
    name: 'Page ',
    orders_per_day: 4300,
  },
];

export default function Charts() {
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
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="orders_per_day" barSize={20} fill="#8884d8" />
        </BarChart>
  )
}
