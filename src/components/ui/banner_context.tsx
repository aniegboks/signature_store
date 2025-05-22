import { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { getActiveBanner } from "@/sanity/lib/banner/getActiveBanner";
import { Banner } from "../../../sanity.types";

type BannerContextProps = {
  banner: Banner[];
};

const BannerContext = createContext<BannerContextProps | undefined>(undefined);

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banner, setBanner] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanner = async () => {
      const activeBanner = await getActiveBanner();
      setBanner(activeBanner);
    };

    fetchBanner();
  }, []);

  return (
    <BannerContext.Provider value={{ banner }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
};
