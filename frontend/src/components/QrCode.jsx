import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ url, size = 256 }) => {
  return (
    <div>
      <QRCode value={url} size={size} />
    </div>
  );
};

export default QRCodeGenerator;