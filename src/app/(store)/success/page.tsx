"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Link from "next/link";
import { useCartStore } from "@/store/store";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart(); 
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 px-4">
      <div className="bg-white p-10 rounded-md shadow-lg w-full max-w-xl text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500" size={60} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase!{orderNumber && ` Your order number is `}
          <span className="font-medium text-black">{orderNumber}</span>.
        </p>

        <Link href="/">
          <Button className="w-full" variant="secondary">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
