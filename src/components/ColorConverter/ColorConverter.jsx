import React, { useState } from 'react';
import './styles.css';

function ColorConverter() {
  const [error, setError] = useState(false);

  const [color, setColor] = useState('#696969');

  const [rgbColor, setRGB] = useState('105, 105, 105');

  const bgColor = {
    backgroundColor: color,
  };

  const container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  function input(evt) {
    const { value } = evt.currentTarget;
    if (value.startsWith('#') && value.length === 7) {
      setError(false);
      const slice = value.slice(1).match(/.{1,2}/g);
      const rgb = [
        parseInt(slice[0], 16),
        parseInt(slice[1], 16),
        parseInt(slice[2], 16),
      ];

      rgb.forEach((x) => {
        if (Number.isNaN(x)) setError(true);
      });

      if (error === false) {
        setRGB(rgb);
        setColor(value);
      } else {
        setColor('#ff0000');
      }
    }
  }

  return (
    <div className='container' style={bgColor}>
      <div style={container}>
        <input type='text' id='color-input' onInput={input} maxLength={7} />
        <span className='color-output'>
          {error ? 'ошибка' : `rgb(${rgbColor})`}
        </span>
      </div>
    </div>
  );
}

export default ColorConverter;
