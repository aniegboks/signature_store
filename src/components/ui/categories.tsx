import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FEATURED_CATEGORIES_QUERYResult } from '../../../sanity.types';
import { imageUrl } from '@/lib/imageUrl';
import Container from './container';

type CategoriesProps = {
  featuredCategories: FEATURED_CATEGORIES_QUERYResult;
};

const Categories = ({ featuredCategories }: CategoriesProps) => {
  return (
    <div className="w-full my-48">
      <Container>
        <div className="flex justify-center mb-8">
          <h3 className="text-xl md:text-3xl font-bold">Explore Categories</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full ">
          {featuredCategories.map((category) => {
            const img = category.image?.asset ? imageUrl(category.image).url() : null;

            return (
              <Link
                key={category._id}
                href={`/category/${category.slug?.current}`}
                className="block group w-full"
              >
                <div className="overflow-hidden w-full shadow hover:shadow-md transition duration-300 rounded-l-md rounded-r-md">
                  {img && (
                    <Image
                      src={img}
                      alt={category.title || 'featured category'}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-180 group-hover:scale-105 transition-transform duration-300 rounded-l-md rounded-r-md"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
