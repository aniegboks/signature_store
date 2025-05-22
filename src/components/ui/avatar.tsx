import React from 'react';
import { twMerge } from 'tailwind-merge';

type AvatarProps = {
    className: string,
    children: React.ReactNode
}
const Avatar = ({ className, children, ...otherProps }: AvatarProps) => {
    return (
        <div className={twMerge("size-20 rounded-full overflow-hidden border-4 border-orange-300 p-1 bg-neutral-900", className)} {...otherProps}>
            {children}
        </div>
    )
}

export default Avatar;