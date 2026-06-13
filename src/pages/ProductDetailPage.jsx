import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { COLOURS, SIZES, SCREEN_SIZES } from '../data/mockData'
import './ProductDetailPage.scss'

function ProductDetailPage() {
  const { id } = useParams()  // get product id from URL
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams() 

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedColour, setSelectedColour] = useState(
    searchParams.get('colour') || COLOURS[0].name
  )
  const [selectedSize, setSelectedSize] = useState(
    searchParams.get('size') || null
  )
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0)
  const [imageAnimating, setImageAnimating] = useState(false)

  const handleThumbnailClick = (index) => {
  if (index === activeThumbIndex) return
  setImageAnimating(true)
  setTimeout(() => {
    setActiveThumbIndex(index)
    setImageAnimating(false)
  }, 200)
}
  // Category based flags 
  const category = product?.category?.toLowerCase()
  const isClothing = category?.includes('clothing')
  const isScreen = category === 'electronics' &&
  ['monitor', 'screen', 'display'].some(word =>
    product?.title?.toLowerCase().includes(word)
  )

  const { addToCart } = useCart()

  // Fetch product details
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setMainImage(data.image)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  // Update URL when variant changes
  useEffect(() => {
  const params = {}
  if (isClothing) {
    params.colour = selectedColour
    params.size = selectedSize || SIZES[0].label
  }
  if (isScreen) {
    params.size = selectedSize || SCREEN_SIZES[0].label
  }
  setSearchParams(params)
}, [selectedColour, selectedSize, isClothing, isScreen])

  const handleAddToCart = () => {
    const selectedSizeObj = SIZES.find(s => s.label === selectedSize)
    if (selectedSizeObj?.status === 'sold-out') return 

    addToCart(product, {
      colour: selectedColour,
      size: selectedSize
    })
  }
  const allSizes = [...SIZES, ...SCREEN_SIZES]
  const isSoldOut = allSizes.find(s => s.label === selectedSize)?.status === 'sold-out'
  const isLowStock = allSizes.find(s => s.label === selectedSize)?.status === 'low-stock'

  if (loading) return <div className="status-msg">Loading product...</div>
  if (error) return <div className="status-msg status-msg--error">{error}</div>

  // Create fake thumbnails using the same image array
  const thumbnails = [product.image, product.image, product.image]

  return (
    <div className="product-detail">

      <button className="product-detail__back" onClick={() => navigate('/')}>
        ← Back to Products
      </button>

      <div className="product-detail__layout">

        <div className="product-detail__images">
          <div className="product-detail__main-image">
             <img                                        
                src={mainImage}
                alt={product.title}
                className={imageAnimating ? 'product-detail__main-image--fade' : ''}
              />
          </div>

          {/* Thumbnails */}
          <div className="product-detail__thumbnails">
            {thumbnails.map((img, index) => (                // ← REPLACE existing map
              <img
                key={index}
                src={img}
                alt={`view ${index + 1}`}
                className={`product-detail__thumb ${activeThumbIndex === index ? 'product-detail__thumb--active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail__info">
          <h1 className="product-detail__title">{product.title}</h1>

          <div className="product-detail__price">
            <span className="product-detail__price--sale">
              ₹{product.price}
            </span>
            <span className="product-detail__price--original">
              ₹{(product.price * 1.2).toFixed(2)} 
            </span>
          </div>

          {isSoldOut && (
            <p className="product-detail__stock product-detail__stock--sold-out">
              Sold Out
            </p>
          )}
          {isLowStock && (
            <p className="product-detail__stock product-detail__stock--low">
              Only a few left!
            </p>
          )}

          {isClothing && (
             <div className="product-detail__section">
            <p className="product-detail__label">
              Colour: <strong>{selectedColour}</strong>
            </p>
            <div className="colour-swatches">
              {COLOURS.map(colour => (
                <button
                  key={colour.name}
                  className={`colour-swatch ${selectedColour === colour.name ? 'colour-swatch--active' : ''}`}
                  style={{ backgroundColor: colour.hex }}
                  onClick={() => setSelectedColour(colour.name)}
                  title={colour.name}
                />
              ))}
            </div>
          </div>
          )}
         
          {isClothing && (
               <div className="product-detail__section">
            <p className="product-detail__label">Size:</p>
            <div className="size-buttons">
              {SIZES.map(size => (
                <button
                  key={size.label}
                  className={`size-btn 
                    size-btn--${size.status} 
                    ${selectedSize === size.label ? 'size-btn--active' : ''}
                  `}
                  onClick={() => setSelectedSize(size.label)}
                  disabled={false}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          )}

          {isScreen && (
            <div className="product-detail__section">
              <p className="product-detail__label">Screen Size:</p>
              <div className="size-buttons">
                {SCREEN_SIZES.map(size => (
                  <button
                    key={size.label}
                    className={`size-btn
                      size-btn--${size.status}
                      ${selectedSize === size.label ? 'size-btn--active' : ''}
                    `}
                    onClick={() => setSelectedSize(size.label)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-detail__section">
            <p className="product-detail__label">Quantity:</p>
            <div className="quantity-picker">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={isSoldOut}>−</button>
              <span className={isSoldOut ? 'quantity-picker__count--disabled' : ''}>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} disabled={isSoldOut}>+</button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className={`add-to-cart-btn ${isSoldOut ? 'add-to-cart-btn--disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={isSoldOut}
          >
            {isSoldOut ? 'Sold Out' : 'Add to Cart'}
          </button>

          <p className="product-detail__description">{product.description}</p>

        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage;