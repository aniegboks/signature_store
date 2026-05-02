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
        <div className="relative min-h-screen bg-white-50 py-32 lg:py-48 selection:bg-neutral-900 selection:text-white font-sans">
            <Container>

                {/* --- EDITORIAL HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b border-neutral-200/60 pb-16">
                    <div className="space-y-6">
                        <h1 className="text-6xl md:text-8xl font-serif italic leading-none tracking-tighter text-[#1A1A1A]">
                            Your <span className="text-neutral-300 not-italic">Collection.</span>
                        </h1>
                    </div>

                    <div className="text-left md:text-right flex flex-col gap-2">
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.3em]">
                            Member Reference
                        </span>
                        <p className="text-xs font-mono font-medium text-neutral-900 uppercase tracking-widest">
                            {userId.slice(-8)}
                        </p>
                        <div className="h-px w-full md:w-auto md:min-w-[120px] bg-neutral-200 my-2" />
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-[0.3em]">
                            Total Entries
                        </span>
                        <p className="text-xs font-mono font-medium text-neutral-900">
                            {String(orders.length).padStart(2, '0')}
                        </p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    /* --- ARCHITECTURAL EMPTY STATE --- */
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-px h-24 bg-gradient-to-b from-transparent via-neutral-300 to-transparent mb-8" />
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.4em] mb-6">
                            [ Status: 000 ]
                        </span>
                        <p className="font-serif italic text-3xl md:text-4xl text-neutral-300 tracking-tight">
                            Your archive is currently empty.
                        </p>
                    </div>
                ) : (
                    /* --- ORDER LEDGER --- */
                    <div className="space-y-32">
                        {orders.map((order, index) => (
                            <div
                                key={order.orderNumber}
                                className="group relative border-t border-neutral-200/60 pt-16"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                                    {/* --- LEFT: STICKY METADATA --- */}
                                    <div className="lg:col-span-3 flex flex-col gap-10 lg:sticky lg:top-32">
                                        <div className="relative">
                                            <span className="absolute -top-10 left-0 text-[10px] font-mono text-neutral-300">
                                                Nº {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <label className="text-[9px] font-mono font-medium text-neutral-400 uppercase tracking-[0.3em] block mb-3">
                                                Invoice Ref
                                            </label>
                                            <p className="text-sm font-mono tracking-tight text-neutral-900 break-all">
                                                {order.orderNumber}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-8 pt-8 border-t border-neutral-100">
                                            <div>
                                                <label className="text-[9px] font-mono font-medium text-neutral-400 uppercase tracking-[0.3em] block mb-3">
                                                    Timestamp
                                                </label>
                                                <p className="text-sm font-serif italic text-neutral-900">
                                                    {new Date(order._createdAt).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-[9px] font-mono font-medium text-neutral-400 uppercase tracking-[0.3em] block mb-3">
                                                    Condition
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <span className={`size-1.5 rounded-full ${order.status === "paid" ? "bg-neutral-900" : "bg-neutral-300"}`} />
                                                    <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-neutral-900">
                                                        {order.status === "paid" ? "Confirmed" : "Processing"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-[9px] font-mono font-medium text-neutral-400 uppercase tracking-[0.3em] block mb-3">
                                                    Valuation
                                                </label>
                                                <p className="text-2xl font-light tracking-tighter text-neutral-900">
                                                    {formatCurrency(order.totalPrice ?? 0, order.currency)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- RIGHT: ACQUIRED ITEMS GALLERY --- */}
                                    <div className="lg:col-span-9 lg:border-l lg:border-neutral-200/60 lg:pl-20">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                                            {order.products?.map((product) => (
                                                <div
                                                    key={product.product?._id}
                                                    className="group/item flex flex-col gap-5"
                                                >
                                                    {/* Image Container with high-end hover states */}
                                                    <div className="relative h-96 md:h-96 w-full bg-neutral-100 overflow-hidden">
                                                        {product.product?.images?.[0] && (
                                                            <Image
                                                                src={imageUrl(product.product.images[0]).url()}
                                                                alt={product.product?.name || 'Item'}
                                                                fill
                                                                className="object-cover object-center grayscale opacity-90 transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover/item:scale-105 group-hover/item:grayscale-0 group-hover/item:opacity-100"
                                                            />
                                                        )}
                                                        {/* Subtle inner shadow overlay */}
                                                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex flex-col">
                                                            <h3 className="text-lg font-serif italic text-neutral-900 leading-tight">
                                                                {product.product?.name}
                                                            </h3>
                                                            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-2">
                                                                Qty: {String(product.quantity || "1").padStart(2, '0')}
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[11px] font-mono font-medium text-neutral-900 uppercase tracking-[0.1em]">
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