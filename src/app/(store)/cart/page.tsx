"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
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
          <div className="text-xl text-gray-500 font-heading">Your cart is empty.</div>
          <div className="w-full flex items-start justify-start mt-24">
            <div className="bg-neutral-100 p-8 rounded-md w-[280px]">
              <div className=" p-6 rounded-md">
                <p className="text-lg font-bold mb-4 font-heading">Order Summary</p>
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
                        Sign in
                      </Button>
                    </div>
                  </SignInButton>
                )}
              </div>
            </div>
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
                className="py-8  rounded-md transition cursor-pointer flex sm:flex-row flex-col justify-between"
                onClick={() => router.push(`/product/${item.product.slug?.current}`)}
              >
                <div className="flex  gap-4">
                  <div className="w-48 h-48 flex-shrink-0 relative">
                    {item.product.images && (
                      <Image
                        src={imageUrl(item.product.images[0]).url()}
                        alt={item.product.name || "Product image"}
                        fill
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex flex-col flex-groww-0 w-20">
                    <div className="font-bold font-heading">{item.product.name}</div>
                    <div className="text-sm text-gray-500 mt-2">${item.product.price}</div>
                  </div>
                </div>
                <div className="flex justify-between h-10 items-center">
                  <div className="flex items-start justify-center">
                    <div className="text-sm px-4 text-neutral-600">Quantity:{item.quantity}</div>
                    <span>|</span>
                    <div className="text-sm text-neutral-600 px-4">Type: {item.product.tag}</div>
                  </div>
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
              </div>
            ))}
          </div>
        </div>
        <hr className="mt-2 text-neutral-300" />


        {/* Order Summary */}

        <div className="w-full flex items-start justify-start">
          <div className="bg-neutral-100 p-8 rounded-md w-[280px]">
            <p className="text-lg  mb-4 font-heading font-bold">Order Summary</p>
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
                  Sign in
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </Container>
      <div className="font-heading">
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default CartPage;
