import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
  const piecolors = ['#FFA805', '#34E000', '#00CFE6', '#EBA3FF', '#FFA3B4'];

  const getData = () => {
    const data = genres.map((genre) => { // map the genres array
      const value = events.filter(({ summary }) =>
        summary.split(" ").includes(genre)
      ).length;

      return { name: genre, value: value };
    });
    return data;  
  };

  useEffect(() => { 
    setData(() => getData()); 
  }, [events]);

  return (
    <ResponsiveContainer height={400} >
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={piecolors[index]}/>
              ))
            }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default EventGenre;