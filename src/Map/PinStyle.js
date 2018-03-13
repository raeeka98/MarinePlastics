const K_SIZE = 30;

const greatPlaceStyle = {
  width: K_SIZE,
  height: K_SIZE,
  borderRadius: '50% 50% 50% 50%',
  backgroundColor: '#ce5648',
  color: '#FFFFFF',
  position: 'absolute',
  Left: K_SIZE,
  Top: K_SIZE,
  cursor: 'pointer'

};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '3px solid #77312a',
  color: '#FFFFFF',
  cursor: 'pointer'
};

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE};
