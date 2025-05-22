"use client"
import { useContext, createContext, useState, ReactNode } from "react";

type GalleryContextProps = {
  mainImageIndex: number;
  setMainImageIndex: (index: number) => void;
};

const GalleryContext = createContext<GalleryContextProps | undefined>(undefined);

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  return (
    <GalleryContext.Provider value={{ mainImageIndex, setMainImageIndex }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};
