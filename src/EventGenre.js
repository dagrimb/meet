import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS', 'Angular'];
  const piecolors = ['#FFA805', '#34E000', '#00CFE6', '#EBA3FF', '#FFA3B4', '#FFF000'];

  const getData = () => {
    return genres
    .map((genre) => { // map the genres array
      return {
        name: genre,
        value: events.filter(({ summary }) =>
        summary.split(" ").includes(genre)
      ).length
      };
    })
      .filter((data) => data.value > 0);
  }
    /*
       return genres
      .reduce(
        (xs, genre) => {
          const value = events.filter(({ summary }) =>
            summary.split(" ").includes(genres)
          ).length;
          return (value > 0) ? [...xs, { name: genre, value}] : xs;
          },
        []
        )};
    */
      



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
          className="pie"
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