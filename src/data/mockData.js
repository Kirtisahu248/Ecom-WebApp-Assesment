export const COLOURS = [
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Red', hex: '#e53935' },
  { name: 'Blue', hex: '#1e88e5' },
]

export const SIZES = [
  { label: 'XS', status: 'available' },
  { label: 'S', status: 'available' },
  { label: 'M', status: 'low-stock' },  // low stock
  { label: 'L', status: 'available' },
  { label: 'XL', status: 'sold-out' },  // sold out
]

export const SCREEN_SIZES = [
  { label: '21"', status: 'available' },
  { label: '27"', status: 'available' },
  { label: '32"', status: 'low-stock' },
  { label: '43"', status: 'available' },
  { label: '49"', status: 'sold-out' },
]