import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 200, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 278, pv: 3908, amt: 2000 },
    { name: 'May', uv: 189, pv: 4800, amt: 2181 },
];

const AreaChartComponent: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height='100%'>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="pv" fill="#8884d8" stroke="#8884d8" />
                <Area type="monotone" dataKey="uv" fill="#82ca9d" stroke="#82ca9d" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartComponent;
