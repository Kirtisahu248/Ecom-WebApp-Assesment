import { useState, useEffect } from 'react'
import ProductCard from '../components/Productcard/ProductCard'
import './HomePage.scss'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)   
  const [error, setError] = useState(null)        

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products')
        return res.json()
      })
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="status-msg">Loading products...</div>
  if (error) return <div className="status-msg status-msg--error">Error: {error}</div>

  return (
    <main className="home-page">
      <h1 className="home-page__title">All Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default HomePage;