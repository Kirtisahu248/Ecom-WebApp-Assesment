import { useCart } from '../../store/CartContext'
import removeIcon from '../../assets/trash.png'
import './CartDrawer.scss'

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()

  return (
    <>
      {isOpen && (
        <div className="overlay" onClick={onClose} />
      )}

      <div className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <h2>Your Cart</h2>
          <button onClick={onClose} className="cart-drawer__close">✖</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your cart is empty!</p>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item__image"
                  />

                  <div className="cart-item__details">
                    <p className="cart-item__title">{item.title}</p>
                    <p className="cart-item__variant">
                      {item.colour} / {item.size}
                    </p>
                    <p className="cart-item__price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="cart-item__qty">
                      <button onClick={() =>
                        updateQuantity(item.id, item.colour, item.size, item.quantity - 1)
                      }>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() =>
                        updateQuantity(item.id, item.colour, item.size, item.quantity + 1)
                      }>+</button>
                    </div>
                  </div>

                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id, item.colour, item.size)}
                  >
                    <img src={removeIcon}/>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer__summary">
              <div className="cart-drawer__summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="cart-drawer__summary-row cart-drawer__summary-row--total">
                <span>Grand Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CartDrawer