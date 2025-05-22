import React from 'react';
import { twMerge } from 'tailwind-merge';

type TestimonialsCardProps = {
  title: string;
  description: string;
  className?: string;
  testimonial?: string;
  children: React.ReactNode;
};

const TestimonialCard = ({
  title,
  description,
  children,
  className,
}: TestimonialsCardProps) => {
  return (
    <div className={twMerge('border bg-neutral-100 border-neutral-300  p-6 rounded-md aspect-video', className)}>
      <div>{children}</div>
      <div className="mt-16 ml-4">
        <h3 className="text-2xl font-bold mt-6">{title}</h3>
        <p className="text-neutral-700 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
