import { sanityFetch } from "../live";
import { couponCode } from "./couponCodes"
import { defineQuery } from "next-sanity"

export const getActiveSaleByCuponCode = async (couponCode: couponCode) => {
    const ACTIVE_SALES_COUPON_QUERY = defineQuery(`*[
    _type == "sale" &&
    isActive == true &&
    couponCode == $couponCode
  ] | order(validForm desc)[0]`);

    try {
        const activeSales = await sanityFetch({
            query: ACTIVE_SALES_COUPON_QUERY,
            params: {
                couponCode,
            },
        });

        return activeSales ? activeSales.data : null;
    } catch (error) {
        console.error("Error failed while activaating coupon code", error);
        return null;
    }

};