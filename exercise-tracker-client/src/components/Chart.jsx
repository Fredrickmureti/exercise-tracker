import React from 'react';
import { LineChart, CartesianGrid, XAxis, Line } from 'recharts';

export const ChartTooltipContent = ({ hideLabel }) => <div>{hideLabel ? '' : 'Tooltip Content'}</div>;
export const ChartTooltip = ({ cursor, content }) => <div>{content}</div>;

export const ChartContainer = ({ config, children }) => (
  <div>
    {Object.keys(config).map(key => (
      <div key={key}>{config[key].label}</div>
    ))}
    {children}
  </div>
);