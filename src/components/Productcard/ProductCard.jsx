import { Link } from 'react-router-dom'
import { useCart } from '../../store/CartContext'
import { COLOURS, SIZES } from '../../data/mockData'
import './ProductCard.scss'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()  // prevent navigating to detail page

    //Default color & size
    const defaultColour = COLOURS[0].name
    const defaultSize = SIZES.find(s => s.status === 'available')?.label || 'M'

    addToCart(product, {
      colour: defaultColour,
      size: defaultSize
    })
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-card__image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-card__image"
          />
          <button
            className="product-card__quick-add"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </Link>

      <div className="product-card__info">
        <Link to={`/product/${product.id}`}>
          <p className="product-card__title">{product.title}</p>
        </Link>
        <p className="product-card__price">₹{product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard