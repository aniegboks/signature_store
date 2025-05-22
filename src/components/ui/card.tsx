import React from 'react';
import { twMerge } from 'tailwind-merge';

type CardProps = {
    title: string,
    description: string,
    children: React.ReactNode,
    className: string
}

const Card = ({ title, description, children, className }: CardProps) => {
    return (
        <div className={twMerge('bg-neutral-100 border border-neutral-300 p-6 rounded-md', className)}>
            <div className='aspect-video'>{children}</div>
            <div>
                <h3 className='text-2xl font-medium mt-6'>{title}</h3>
                <p className='text-neutral-700 mt-2'>{description}</p>
            </div>
        </div>
    )
}

export default Card;