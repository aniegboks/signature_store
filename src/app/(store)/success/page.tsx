'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { useCartStore } from '@/store/store';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
      >
        <Image
          src="/assets/checkout/img.svg"
          height={800}
          width={800}
          alt="checkout"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="p-10 w-full max-w-xl text-center mt-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase!
          {orderNumber && (
            <>
              {' '}Your order number is <br /><span className="font-medium text-green-600 mt-2">{orderNumber}</span>.
            </>
          )}
        </p>
        <div className='flex gap-4 mt-4'>
          <Link href="/">
            <Button className="w-full" variant="secondary">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/orders">
            <Button className="w-full bg-neutral-400" variant="primary">
             Check Orders
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessPage;
