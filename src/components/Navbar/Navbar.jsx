import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../store/CartContext'
import CartDrawer from '../cartdrawer/CartDrawer'
import cart from '../../assets/shopping-cart.png'
import  '../Navbar/Navbar.scss'

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__logo">
          Shopwave
        </Link>

        <button
          className="navbar__cart-btn"
          onClick={() => setIsDrawerOpen(true)}
        >
          <img src={cart} className="navbar__cart-icon"/>
          {totalItems > 0 && (
            <span className="navbar__badge">{totalItems}</span>
          )}
        </button>
      </nav>

      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}

export default Navbar;