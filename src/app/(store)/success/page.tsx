'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/store';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Container from '@/components/ui/container';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get('orderNumber');
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] flex flex-col justify-center py-32 relative overflow-hidden selection:bg-black selection:text-white">

      {/* --- AMBIENT WATERMARK --- */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <h2 className="text-[25vw] font-serif italic select-none">Confirmed</h2>
      </div>

      <Container>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">


          {/* --- MAIN EDITORIAL --- */}
          <div className="space-y-8 mb-16">
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-400 block">
              Selection Finalized
            </span>
            <h1 className="text-7xl md:text-9xl font-serif italic leading-none tracking-tighter">
              Acquired<span className="text-neutral-200 not-italic">.</span>
            </h1>
            <p className="text-sm md:text-base text-neutral-500 max-w-sm mx-auto leading-relaxed">
              Your items have been documented and are currently being prepared for transition to your archive.
            </p>
          </div>

          {/* --- REFERENCE BLOCK --- */}
          {orderNumber && (
            <div className="bg-white border border-black/[0.04] px-8 py-5 mb-16 inline-block">
              <span className="block text-[8px] font-medium text-neutral-300 uppercase tracking-[0.4em] mb-1">
                Ref. ID
              </span>
              <span className="text-[11px] font-medium tracking-[0.1em] text-[#1A1A1A] uppercase">
                {orderNumber}
              </span>
            </div>
          )}

          {/* --- CONTAINED ACTIONS --- */}
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
            {/* Primary Action */}
            <button
              onClick={() => router.push('/orders')}
              className="group relative flex-1 h-20 bg-[#1A1A1A] text-white flex items-center justify-center overflow-hidden transition-all duration-700"
            >
              <div className="relative z-10 flex items-center gap-4 px-6">
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap pt-0.5">
                  View Collection
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500 ease-out flex-shrink-0" />
              </div>

              {/* Wipe Effect */}
              <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />

              {/* Internal Border Detail */}
              <div className="absolute inset-1.5 border border-white/0 group-hover:border-white/5 transition-colors duration-700" />
            </button>

            {/* Secondary Action */}
            <button
              onClick={() => router.push('/')}
              className="flex-1 h-20 border border-black/5 bg-white text-[#1A1A1A] flex items-center justify-center transition-all duration-500 hover:bg-neutral-50"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap pt-0.5">
                Return to Studio
              </span>
            </button>
          </div>

        </div>
      </Container>

      {/* --- STUDIO MARK --- */}
      <div className="absolute bottom-12 left-0 right-0 text-center">
        <p className="text-[8px] font-medium text-neutral-300 uppercase tracking-[0.6em]">
          Signature Studio — 2026 Distribution
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;