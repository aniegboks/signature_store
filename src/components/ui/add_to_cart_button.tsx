"use client";

import { Product } from "../../../sanity.types";
import { useCartStore } from "@/store/store";
import { useState, useEffect } from "react";
import Button from "./button";
import toast, { Toaster } from 'react-hot-toast';

type AddToCartButtonProps = {
  product: Product;
  disabled: boolean;
};

const AddToCartButton = ({ product, disabled }: AddToCartButtonProps) => {
  const { addItem, removeItem, getItemCount } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const itemCount = getItemCount(product._id);
  const isRemoveDisabled = itemCount === 0;

  const addItems = () => {
    addItem(product);
    toast.success(`${product.name} sucessfully added to cart`);
  };

  return (
    <div className="space-x-4 mt-8 flex items-center">
      <Button
        onClick={addItems}
        disabled={disabled}
        className="hover-gradient-move text-white hover:text-white flex items-center justify-center font-bold text-lg disabled:opacity-50 font-heading"
      >
        Add to cart
      </Button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddToCartButton;
