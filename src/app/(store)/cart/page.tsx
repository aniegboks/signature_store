"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/store";
import { SignedIn, SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/ui/loader";
import Button from "@/components/ui/button";
import { createCheckoutSession, Metadata } from "@/action/createCheckkoutSession";

// Optional: define metadata type if needed
// type Metadata = { orderNumber: string; customerName: string; customerEmail: string; clerkUserId: string };

const CartPage = () => {
  const groupItems = useCartStore((state) => state.getGroupedItems());
  const removeItem = useCartStore((state) => state.removeItem);
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

  const handleCheckout = () => {
    if (groupItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!isSignedIn) {
      toast.error("Please sign in to proceed to checkout.");
      router.push("/sign-in");
      return;
    }

    router.push("/checkout");
  };

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

      if (response.success) {
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
      <div className="py-32">
        <Container>
          <div className="text-center text-xl text-gray-500">Your cart is empty.</div>
          <div className="mt-24 max-w-md mx-auto shadow-sm p-6 rounded-md">
            <p className="text-lg font-semibold mb-4">Order Summary</p>
            <hr className="text-neutral-300 mb-4" />
            <div className="flex items-center justify-between text-sm">
              <p>Order Total:</p>
              <span className="font-medium">$0.00</span>
            </div>
            {isSignedIn ? (
              <div>
                <Button className="mt-6 w-full" variant="secondary" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            ) : (
              <SignInButton mode="modal">
                <div>
                  <Button className="mt-6 w-full" variant="secondary">
                    Sign in to Checkout
                  </Button>
                </div>
              </SignInButton>
            )}
          </div>
        </Container>
        <Toaster position="top-center" />
      </div>
    );
  }

  return (
    <div className="py-32">
      <Container>
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-x-28">
          <div className="flex-grow space-y-6">
            {groupItems.map((item) => (
              <div
                key={item.product._id}
                className="p-4 border rounded-md transition cursor-pointer flex items-center justify-between"
                onClick={() => router.push(`/product/${item.product.slug?.current}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 flex-shrink-0 relative">
                    {item.product.images && (
                      <Image
                        src={imageUrl(item.product.images[0]).url()}
                        alt={item.product.name || "Product image"}
                        fill
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <div className="font-semibold">{item.product.name}</div>
                    <div className="text-sm text-gray-500">${item.product.price}</div>
                  </div>
                </div>
                <div className="text-sm font-medium">Quantity: {item.quantity}</div>
                <div
                  className="h-8 w-8 rounded-full shadow-sm flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-transform duration-200 transform hover:scale-110 cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.product._id);
                    toast.success(`${item.product.name} removed from cart.`);
                  }}
                >
                  <X size={14} className="text-neutral-700 transition-transform duration-200 group-hover:scale-110" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-24 max-w-md mx-auto shadow-sm p-6 rounded-md">
          <p className="text-lg font-semibold mb-4">Order Summary</p>
          <hr className="text-neutral-300 mb-4" />
          <div className="flex items-center justify-between text-sm">
            <p>Order Total:</p>
            <span className="font-medium">${totalPrice}</span>
          </div>
          {isSignedIn ? (
            <Button className="mt-6 w-full" variant="secondary" onClick={handleOrderCheckout} disabled={isLoading}>
              {isLoading ? "Processing..." : "Checkout"}
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button className="mt-6 w-full" variant="secondary">
                Sign in to Checkout
              </Button>
            </SignInButton>
          )}
        </div>
      </Container>
      <Toaster position="top-center" />
    </div>
  );
};

export default CartPage;
