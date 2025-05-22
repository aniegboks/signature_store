import React from 'react'
import { Product, Category } from '../../../sanity.types'
import ProductGrid from './product_grid';
interface ProductViewProps {
  products: Product[];
  categories: Category[];
}

const ProductView = ({ products, categories }: ProductViewProps) => {
  return (
    <div className='flex flex-col'>
      <div className='flex-1'>
        <ProductGrid products={products} />
        <hr className='w-1/2 sm:w-3/4'/>
      </div>
    </div>
  )
}

export default ProductView