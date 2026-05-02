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
        <div className="relative min-h-screen bg-neutral-50 py-32 lg:py-48 selection:bg-black selection:text-white">
            <Container>
                {/* --- EDITORIAL HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-black/5 pb-12">
                    <div className="space-y-4">
                        {/* <div className="flex items-center gap-3">
                            <span className="text-[10px] font-medium tracking-[0.3em] text-neutral-400 uppercase">
                                Personal History
                            </span>
                            <div className="w-8 h-px bg-neutral-200" />
                        </div> */}
                        <h1 className="text-6xl md:text-8xl font-serif italic leading-none tracking-tighter text-[#1A1A1A]">
                            Your <span className="text-neutral-300 not-italic">Collection.</span>
                        </h1>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest leading-relaxed">
                            Member Ref. {userId.slice(-8).toUpperCase()} <br />
                            Total Pieces Acquired: {orders.length}
                        </p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 border border-dashed border-black/10">
                        <p className="font-serif italic text-xl text-neutral-300">
                            Your collection is currently empty.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-16 lg:space-y-24">
                        {orders.map((order, index) => (
                            <div
                                key={order.orderNumber}
                                className="group relative"
                            >
                                {/* --- ORDER METADATA --- */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-12 border-b border-black/5">

                                    {/* PROVENANCE DETAILS */}
                                    <div className="lg:col-span-4 space-y-10">
                                        <div className="relative">
                                            <span className="absolute -top-8 left-0 text-[10px] font-mono text-neutral-200">
                                                [{String(index + 1).padStart(2, '0')}]
                                            </span>
                                            <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-[0.3em] block mb-3">
                                                Order Reference
                                            </label>
                                            <p className="text-sm font-medium tracking-tight text-[#1A1A1A] break-all">
                                                {order.orderNumber}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-start pt-6 border-t border-black/5">
                                            <div>
                                                <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-[0.3em] block mb-2">Ordered On</label>
                                                <p className="text-base font-serif italic text-[#1A1A1A]">
                                                    {new Date(order._createdAt).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-[0.3em] block mb-2">Status</label>
                                                <div className="flex items-center gap-3 justify-end">
                                                    <span className={`size-1.5 rounded-full ${order.status === "paid" ? "bg-black" : "bg-neutral-300"}`} />
                                                    <span className="text-[10px] font-medium uppercase tracking-widest text-[#1A1A1A]">
                                                        {order.status === "paid" ? "Confirmed" : "In Progress"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-[0.3em] block mb-2">Investment Total</label>
                                            <p className="text-3xl font-light tracking-tighter text-[#1A1A1A]">
                                                {formatCurrency(order.totalPrice ?? 0, order.currency)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* ACQUIRED SILHOUETTES */}
                                    <div className="lg:col-span-8">
                                        <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-[0.3em] block mb-8">Selection Details</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            {order.products?.map((product) => (
                                                <div
                                                    key={product.product?._id}
                                                    className="flex items-center gap-6 bg-white p-5 border border-black/5 group-hover:border-black/6 transition-all duration-700 ease-out"
                                                >
                                                    <div className="relative h-24 w-20 flex-shrink-0 bg-[#F5F4F0] overflow-hidden">
                                                        {product.product?.images?.[0] && (
                                                            <Image
                                                                src={imageUrl(product.product.images[0]).url()}
                                                                alt={product.product?.name || 'Item'}
                                                                fill
                                                                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col justify-center overflow-hidden">
                                                        <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest mb-1">
                                                            Qty: {product.quantity || "1"}
                                                        </span>
                                                        <h3 className="text-lg font-serif italic text-[#1A1A1A] truncate leading-tight mb-2">
                                                            {product.product?.name}
                                                        </h3>
                                                        <p className="text-[10px] font-medium text-neutral-300 uppercase tracking-[0.2em]">
                                                            Individual / {formatCurrency(product.product?.price ?? 0, order.currency)}
                                                        </p>
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