import React from 'react'
import { Product, Category } from '../../../sanity.types'
import ProductGrid from './product_grid';
interface ProductViewProps {
  products: Product[];
  categories: Category[];
}

const ProductView = ({ products}: ProductViewProps) => {
  return (
    <div className='flex flex-col'>
      <div className='flex-1'>
        <ProductGrid products={products} slug=""/>
        <hr className='w-1/2 sm:w-3/4'/>
      </div>
    </div>
  )
}

export default ProductView