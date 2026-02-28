import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // Assuming you have a cn helper, otherwise use clsx

const buttonClasses = cva(
  'relative inline-flex items-center justify-center uppercase font-mono tracking-[0.2em] text-[10px] transition-all duration-300 active:scale-[0.98] overflow-hidden',
  {
    variants: {
      variant: {
        // THE MAIN PEACH-ON-BLACK ACTION
        primary: 
          'bg-black text-[#f97316] hover:bg-[#f97316] hover:text-black shadow-lg',
        
        // THE TECHNICAL WIREFRAME
        secondary: 
          'bg-transparent text-black/40 border border-black/10 hover:border-black hover:text-black',
        
        // THE GHOST/INACTIVE STATE
        ghost:
          'bg-transparent text-black/20 hover:text-[#f97316] tracking-[0.4em]',
      },
      size: {
        default: 'h-14 px-10',
        sm: 'h-10 px-6 text-[8px]',
        full: 'w-full h-16',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonClasses> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, className, children, ...props }) => {
  return (
    <button className={cn(buttonClasses({ variant, size }), className)} {...props}>
      {/* HUD DECORATION - Tiny corner ticks only visible on primary hover */}
      <span className="absolute top-0 left-0 size-1 border-t border-l border-current opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <span className="relative z-10 flex items-center gap-2">
        {variant === 'primary' && (
          <span className="size-1 bg-[#f97316] rounded-full group-hover:bg-black transition-colors" />
        )}
        {children}
      </span>
      
      {/* SHIMMER EFFECT FOR PRIMARY */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/5 -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      )}
    </button>
  );
};

export default Button;