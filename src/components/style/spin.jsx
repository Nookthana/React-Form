import React from 'react';
import { Spin } from 'antd';

const SpinOverlay = ({ loading, tip }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, 
  };

  return (
    loading && (
      <div style={overlayStyle}>
        <Spin tip={tip} size="large" spinning={loading} />
      </div>
    )
  );
};

export default SpinOverlay;
