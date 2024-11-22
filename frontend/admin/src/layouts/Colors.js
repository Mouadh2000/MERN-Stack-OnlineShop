import React from 'react';

const Colors = ({ colors }) => (
  <div style={{ display: 'flex', gap: '5px' }}>
    {colors.map((color, index) => (
      <div
        key={index}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: color, // No need to use split here
          border: '1px solid #ccc',
        }}
      />
    ))}
  </div>
);

export default Colors;
