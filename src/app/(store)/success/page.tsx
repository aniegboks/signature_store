'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { useCartStore } from '@/store/store';
import { motion } from 'framer-motion';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] px-4 overflow-hidden relative">
      {/* BACKGROUND TELEMETRY GRID */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      {/* JET TURBINE / THRUST VISUALIZATION */}
      <div className="relative flex items-center justify-center w-full max-w-md h-64 mb-12">
        {/* Turbine Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.2, 0], scale: [0.8, 1.5, 2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut"
            }}
            className="absolute border border-[#f97316] rounded-full"
            style={{ width: '120px', height: '120px' }}
          />
        ))}

        {/* Central Engine Core */}
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          className="relative z-10 size-32 border-4 border-black rounded-full flex items-center justify-center bg-white shadow-2xl"
        >
          <div className="size-24 border border-black/10 rounded-full border-dashed animate-spin-slow" />
          <div className="absolute size-4 bg-[#f97316] rounded-full shadow-[0_0_20px_#f97316]" />
        </motion.div>

        {/* Heat Trails (Exhaust) */}
        <motion.div 
          animate={{ height: [80, 120, 80], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 0.2, repeat: Infinity }}
          className="absolute top-[60%] w-[2px] bg-gradient-to-b from-[#f97316] to-transparent z-0"
        />
      </div>

      {/* TEXT DATA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-20 text-center"
      >
        <div className="inline-block bg-black text-white px-3 py-1 text-[10px] font-mono tracking-[0.3em] uppercase mb-6">
          System_Ignition_Success
        </div>
        
        <h1 className="text-5xl md:text-6xl font-serif italic uppercase tracking-tighter text-black mb-4">
          Order Launched
        </h1>

        <div className="max-w-xs mx-auto space-y-4">
          <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest leading-relaxed">
            Payment verified. Propulsion engaged. Your items are currently in transition to your coordinates.
          </p>

          {orderNumber && (
            <div className="bg-white border border-black/5 p-4 rounded-sm shadow-sm mt-8">
              <span className="block text-[8px] font-mono text-black/30 uppercase tracking-[0.2em] mb-1">Tracking_Ref</span>
              <span className="font-mono text-sm font-bold text-[#f97316] uppercase select-all">{orderNumber}</span>
            </div>
          )}
        </div>

        {/* NAV NODES */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
          <Link href="/">
            <Button className="min-w-[160px] py-6 font-mono text-xs uppercase tracking-widest" variant="secondary">
              Catalog_Return
            </Button>
          </Link>
          <Link href="/orders">
            <Button className="min-w-[160px] py-6 font-mono text-xs uppercase tracking-widest bg-black text-white hover:bg-[#f97316] hover:text-black transition-colors">
              Monitor_Orders
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* FOOTER TELEMETRY */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <span className="text-[8px] font-mono text-black/20 uppercase tracking-[0.5em]">
          Mach_1.2 // Nominal_Output
        </span>
      </div>
    </div>
  );
};

export default SuccessPage;