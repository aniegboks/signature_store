import React from 'react';
import { MousePointer } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type PointerProps = {
    name: string,
    color: string
}
const Pointer = ({ name, color }: PointerProps) => {
    return (
        <div className='relative'>
            <MousePointer className='w-5 h-5 text-neutral-500' />
            <div className='absolute top-full left-full'>
                <div className={twMerge('inline-flex rounded-full font-bold text-white text-sm bg-orange-300 px-2 rounded-tl-none', color === 'orange-400' && 'bg-orange-400')}>
                    {name}
                </div>

            </div>
        </div>
    )
}

export default Pointer;