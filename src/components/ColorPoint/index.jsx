import { useState } from 'react';
import { Button, Popover } from '@mui/material';

const ColorPoint = ({ color, handler }) => {
  return (
    <Button
      style={{
        width: '32px',
        height: '32px',
        backgroundColor: color,
        borderRadius: '50%',
      }}
      onClick={() => handler(color)}
    />
  );
};

export default ColorPoint;
