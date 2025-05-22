"use client"
import React, { useState } from 'react'
import { PRODUCT_BY_QUERY_IDResult } from '../../../sanity.types'

type SizeProps = {
  product: PRODUCT_BY_QUERY_IDResult
}

const Size = ({ product }: SizeProps) => {
  const [selectedSize, setSelectedSize] = useState<number>(0)

  return (
    <div>
      <div className="flex gap-2">
        {product?.sizes?.map((size: string, i: number) => (
          <button
            key={i}
            onClick={() => setSelectedSize(i)}
            className={`rounded-md border p-4 font-bold ${
              selectedSize === i
                ? 'text-black bg-neutral-200 border border-neutral-400'
                : 'text-neutral-700 bg-neutral-200'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Size
