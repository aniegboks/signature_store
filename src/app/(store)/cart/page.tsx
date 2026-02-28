"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/ui/loader";
import Button from "@/components/ui/button";
import { createCheckoutSession, Metadata } from "@/action/createCheckkoutSession";

const CartPage = () => {
  const groupItems = useCartStore((state) => state.getGroupedItems());
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem); 
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  const totalPrice = getTotalPrice().toFixed(2);

  const handleOrderCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName || "unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress || "unknown",
        clerkUserId: user?.id || "unknown",
      };

      const response = await createCheckoutSession(groupItems, metadata);

      if (response.success && response.message) {
        window.location.href = response.message;
      } else {
        toast.error(response.message || "Checkout failed.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Something went wrong during checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  if (groupItems.length === 0) {
    return (
      <div className="py-48 min-h-screen bg-[#F5F5F5]">
        <Container>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="size-20 bg-black/10 rounded-full flex items-center justify-center mb-8">
              <ShoppingBag className="text-black" size={32} />
            </div>
            <h1 className="text-4xl font-serif italic uppercase tracking-tighter mb-4 text-black">Your Cart is Empty</h1>
            <p className="text-black/60 font-mono text-xs uppercase tracking-widest mb-12">No_Items_Detected_In_Buffer</p>
            <Button onClick={() => router.push("/")} variant="secondary">
              Return to Catalog
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-32 md:py-48 min-h-screen bg-[#F5F5F5]">
      <Container>
        {/* PAGE HEADER */}
        <div className="flex items-end gap-4 mb-16 border-b border-black/10 pb-8">
          <h1 className="text-5xl md:text-7xl font-serif italic text-black leading-none uppercase tracking-tighter">
            Cart
          </h1>
          <span className="text-[10px] font-mono text-black/40 uppercase tracking-[0.3em] mb-2 font-bold">
            Items_Count // {groupItems.length}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* ITEMS LIST */}
          <div className="lg:col-span-8 space-y-4">
            {groupItems.map((item, index) => (
              <div
                key={item.product._id}
                className="group relative bg-white p-6 flex flex-col md:flex-row gap-8 items-center transition-all border border-black/5 hover:border-[#f97316]/30 shadow-sm"
              >
                {/* INDEX NODE */}
                <span className="absolute top-4 left-4 text-[8px] font-mono text-black/40 font-bold">0{index + 1}</span>

                {/* IMAGE CONTAINER */}
                <div 
                  className="w-40 h-40 bg-[#F9F9F9] p-4 cursor-pointer overflow-hidden border border-black/5"
                  onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                >
                  {item.product.images && (
                    <Image
                      src={imageUrl(item.product.images[0]).url()}
                      alt={item.product.name || "Product"}
                      width={160}
                      height={160}
                      className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>

                {/* INFO */}
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-serif italic uppercase tracking-tight mb-1 text-black">{item.product.name}</h3>
                  <p className="text-[10px] font-mono text-[#f97316] uppercase tracking-widest mb-6 font-bold">
                    Type: {item.product.tag || "Standard_Issue"}
                  </p>
                  
                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <button 
                      onClick={() => removeItem(item.product._id)}
                      className="size-10 flex items-center justify-center border border-black/10 text-black hover:bg-black hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-base font-bold w-6 text-center text-black">{item.quantity}</span>
                    <button 
                      onClick={() => addItem(item.product)}
                      className="size-10 flex items-center justify-center border border-black/10 text-black hover:bg-black hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* PRICE & REMOVE */}
                <div className="flex flex-col items-end justify-between self-stretch py-2">
                  <p className="font-mono text-xl font-bold text-black">
                    ${(item.product.price! * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.product._id); 
                      toast.success("Item removed");
                    }}
                    className="text-[10px] font-mono text-black/40 hover:text-red-600 uppercase tracking-widest transition-colors flex items-center gap-2 font-bold"
                  >
                    <X size={14} /> Remove_Node
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 bg-black p-8 shadow-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-[#f97316] text-black px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest">
                  Order_Summary
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[11px] font-mono text-white/50 uppercase tracking-widest font-bold">
                  <span>Subtotal</span>
                  <span className="text-white">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-white/50 uppercase tracking-widest font-bold">
                  <span>Shipping</span>
                  <span className="text-[#f97316]">TBD</span>
                </div>
                <div className="h-px bg-white/20 my-6" />
                <div className="flex justify-between items-end">
                  <span className="font-serif italic text-2xl text-white">Total</span>
                  <span className="text-3xl font-mono text-[#f97316] font-bold">${totalPrice}</span>
                </div>
              </div>

              {isSignedIn ? (
                <Button 
                  className="w-full py-8 text-lg font-bold uppercase tracking-widest bg-[#f97316] hover:bg-white text-black transition-all" 
                  onClick={handleOrderCheckout} 
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Initiate Checkout"}
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="w-full py-8 text-lg font-bold bg-white text-black hover:bg-[#f97316]">
                    Sign In
                  </Button>
                </SignInButton>
              )}

              <p className="mt-8 text-[9px] font-mono text-white/30 uppercase text-center tracking-[0.3em] font-bold">
                Transmission_Secure // AES_256
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default CartPage;