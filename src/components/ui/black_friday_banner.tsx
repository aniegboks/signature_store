import React from 'react'
import { getActiveSaleByCuponCode } from '@/sanity/lib/sales/getActiveCoupon'
import { COUPON_CODE } from '@/sanity/lib/sales/couponCodes'

const BlackFridayBanner = async () => {
    const sale = await getActiveSaleByCuponCode(COUPON_CODE.BFRIDAY);

    if (!sale?.isActive) {
        return null;
    }
    return (
        <div className='bg-gradient-to-br from-blue-600 to black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg'>
            BlackFridayBanner
        </div>
    )
}

export default BlackFridayBanner;