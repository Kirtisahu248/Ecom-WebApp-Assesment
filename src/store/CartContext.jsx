import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  // Load cart from localStorage on first render
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  // Save to localStorage every time cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, variant) => {
    setCartItems(prev => {
      const existing = prev.find(
        item =>
          item.id === product.id &&
          item.colour === variant.colour &&
          item.size === variant.size
      )

      if (existing) {
        return prev.map(item =>
          item.id === product.id &&
          item.colour === variant.colour &&
          item.size === variant.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        colour: variant.colour,
        size: variant.size,
        quantity: 1
      }]
    })
  }

  const removeFromCart = (id, colour, size) => {
    setCartItems(prev =>
      prev.filter(
        item => !(item.id === id && item.colour === colour && item.size === size)
      )
    )
  }

  const updateQuantity = (id, colour, size, quantity) => {
    if (quantity < 1) return
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.colour === colour && item.size === size
          ? { ...item, quantity }
          : item
      )
    )
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}