import React from 'react';

const Spinner = (props) => {
  const borderStyle = {
    border: `8px solid ${props.color ?? '#FFFFFF'}`,
    borderColor: `${props.color ?? '#FFFFFF'} transparent transparent transparent`
  }
  return (
    <div className="infinite-loading-wrapper">
      <div className="infinite-loading">
        <div style={borderStyle}/>
        <div style={borderStyle}/>
        <div style={borderStyle}/>
        <div style={borderStyle}/>
      </div>
    </div>
  );
}

export default Spinner;