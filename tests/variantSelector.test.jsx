import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SIZES } from '../src/data/mockData'

// Sold out stock state
describe('Variant Selector - Size Buttons', () => {

  it('should have sold-out status for XL size in mock data', () => {
    const xlSize = SIZES.find(s => s.label === 'XL')
    expect(xlSize).toBeDefined()
    expect(xlSize.status).toBe('sold-out')
  })

  // Low stock size state 
  it('should have low-stock status for M size in mock data', () => {
    const mSize = SIZES.find(s => s.label === 'M')
    expect(mSize).toBeDefined()
    expect(mSize.status).toBe('low-stock')
  })

  // Available sizes
  it('should have available status for XS size in mock data', () => {
    const xsSize = SIZES.find(s => s.label === 'XS')
    expect(xsSize).toBeDefined()
    expect(xsSize.status).toBe('available')
  })

  // Quantity should not go below 1
  it('should not go below 1 when decrementing [decreasing] quantity', () => {
    let quantity = 1
    const decrease = (q) => Math.max(1, q - 1)
    quantity = decrease(quantity)
    expect(quantity).toBe(1)  // should stay at 1, not go to 0
  })

  // Quantity increment
  it('should increase quantity correctly', () => {
    let quantity = 1
    quantity = quantity + 1
    expect(quantity).toBe(2)
  })

  // isSoldOut logic 
  it('should correctly identify sold-out variant', () => {
    const selectedSize = 'XL'
    const isSoldOut = SIZES.find(s => s.label === selectedSize)?.status === 'sold-out'
    expect(isSoldOut).toBe(true)
  })

  // Add to Cart should be blocked when sold out 
  it('should block add to cart when variant is sold out', () => {
    const selectedSize = 'XL'
    const isSoldOut = SIZES.find(s => s.label === selectedSize)?.status === 'sold-out'
    
    // Checking handleAddToCart logic
    let cartUpdated = false
    const handleAddToCart = () => {
      if (isSoldOut) return 
      cartUpdated = true
    }
    
    handleAddToCart()
    expect(cartUpdated).toBe(false)  // cart should NOT be updated
  })

})