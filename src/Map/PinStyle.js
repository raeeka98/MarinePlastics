const K_SIZE = 40;

const greatPlaceStyle = {
  width: K_SIZE,
  height: K_SIZE,
  borderRadius: '50% 50% 50% 0',
  backgroundColor: '#00cae9',
  position: 'absolute',
  Left: K_SIZE,
  Top: K_SIZE,
  cursor: 'pointer'

};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '3px solid #3f51b5',
  color: '#f44336',
  cursor: 'pointer'
};

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE};
