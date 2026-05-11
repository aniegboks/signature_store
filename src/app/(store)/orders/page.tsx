import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getMyOrders } from '@/sanity/lib/orders/getOrders'
import Container from '@/components/ui/container'
import { MY_QUERY_ORDERSResult } from '../../../../sanity.types'
import { formatCurrency } from '@/lib/formatCurrency'
import { imageUrl } from '@/lib/imageUrl'
import Image from 'next/image'

const OrdersPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const orders: MY_QUERY_ORDERSResult = await getMyOrders(userId);

    return (
        <div className="relative min-h-screen bg-[#FAFAFA] py-32 lg:py-48 selection:bg-neutral-900 selection:text-white font-sans">
            <Container>

                {/* --- EDITORIAL HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-neutral-300 pb-16">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading tracking-tight text-neutral-900 leading-[0.9]">
                            Your <br />
                            <span className="italic font-light text-neutral-400">Collection.</span>
                        </h1>
                    </div>

                    <div className="text-left md:text-right flex flex-col gap-3">
                        <div>
                            <span className="text-[10px] font-body font-medium text-neutral-500 uppercase tracking-widest block mb-1">
                                Client ID
                            </span>
                            <p className="text-sm font-body text-neutral-900 uppercase tracking-wider">
                                {userId.slice(-8)}
                            </p>
                        </div>
                        <div className="h-px w-full md:w-auto md:min-w-[140px] bg-neutral-300 my-1" />
                        <div>
                            <span className="text-[10px] font-body font-medium text-neutral-500 uppercase tracking-widest block mb-1">
                                Total Archives
                            </span>
                            <p className="text-sm font-body text-neutral-900">
                                {String(orders.length).padStart(2, '0')}
                            </p>
                        </div>
                    </div>
                </div>

                {orders.length === 0 ? (
                    /* --- ARCHITECTURAL EMPTY STATE --- */
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="w-px h-32 bg-gradient-to-b from-transparent via-neutral-400 to-transparent mb-10" />
                        <span className="text-xs font-body font-medium text-neutral-400 uppercase tracking-[0.3em] mb-6">
                            Archive Empty
                        </span>
                        <p className="font-heading italic text-3xl md:text-5xl text-neutral-300 tracking-tight text-center max-w-lg">
                            No pieces have been collected yet.
                        </p>
                    </div>
                ) : (
                    /* --- ORDER LEDGER --- */
                    <div className="space-y-32">
                        {orders.map((order, index) => (
                            <div
                                key={order.orderNumber}
                                className="group relative border-t border-neutral-300 pt-16"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                                    {/* --- LEFT: STICKY METADATA --- */}
                                    <div className="lg:col-span-4 flex flex-col gap-12 lg:sticky lg:top-32">
                                        <div className="relative">
                                            <span className="absolute -top-12 left-0 text-sm font-serif italic text-neutral-400">
                                                Nº {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <label className="text-[10px] font-sans font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-2">
                                                Order Reference
                                            </label>
                                            <p className="text-lg font-mono tracking-tight text-neutral-900 break-all">
                                                {order.orderNumber}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-8 pt-8 border-t border-neutral-200">
                                            <div>
                                                <label className="text-[10px] font-sans font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-2">
                                                    Acquired On
                                                </label>
                                                <p className="text-base font-body text-neutral-900">
                                                    {new Date(order._createdAt).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-body font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-2">
                                                    Status
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <span className={`size-2 rounded-full ${order.status === "paid" ? "bg-[#1A1A1A]" : "bg-neutral-300"}`} />
                                                    <span className="text-xs font-body font-medium uppercase tracking-widest text-neutral-900">
                                                        {order.status === "paid" ? "Confirmed" : "Processing"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-body font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-2">
                                                    Total Valuation
                                                </label>
                                                <p className="text-3xl font-light tracking-tighter text-neutral-900">
                                                    {formatCurrency(order.totalPrice ?? 0, order.currency)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- RIGHT: ACQUIRED ITEMS GALLERY --- */}
                                    <div className="lg:col-span-8 lg:border-l lg:border-neutral-200 lg:pl-16">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                                            {order.products?.map((product) => (
                                                <div
                                                    key={product.product?._id}
                                                    className="group/item flex flex-col gap-6"
                                                >
                                                    {/* Image Container */}
                                                    <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-neutral-200 overflow-hidden">
                                                        {product.product?.images?.[0] && (
                                                            <Image
                                                                src={imageUrl(product.product.images[0]).url()}
                                                                alt={product.product?.name || 'Item'}
                                                                fill
                                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                                className="object-cover object-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:scale-105"
                                                            />
                                                        )}
                                                        {/* Subtle dark gradient overlay at the bottom for image depth */}
                                                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex flex-col">
                                                            <h3 className="text-xl font-serif text-neutral-900 leading-tight">
                                                                {product.product?.name}
                                                            </h3>
                                                            <span className="text-xs font-sans text-neutral-500 mt-2">
                                                                Qty: {String(product.quantity || "1").padStart(2, '0')}
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-medium text-neutral-900">
                                                                {formatCurrency(product.product?.price ?? 0, order.currency)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default OrdersPage;