import React from 'react';
import { ALL_PRODUCTS_QUERYResult } from '../../../sanity.types';

type RelatedItemsProps = {
  relatedItem: ALL_PRODUCTS_QUERYResult;
};

const RelatedItems = ({ relatedItem }: RelatedItemsProps) => {
    console.log(`related item: ${relatedItem}`)
  if (!relatedItem || relatedItem.length === 0) {
    return (
      <div className="mt-4 text-neutral-500">
        No related products found.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="font-bold text-xl md:text-2xl tracking-tighter mb-6">
        Discover Similar
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedItem.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-sm">
            <p className="font-semibold">{item.name}</p>
            {/* Optional: Display image, price, or link */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
