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
        <div className="relative min-h-screen bg-[#F5F5F5] py-32 md:py-48 selection:bg-[#f97316] selection:text-black">
            {/* SUBTLE DOT GRID BACKGROUND */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 0)', backgroundSize: '32px 32px' }} 
            />

            <Container>
                {/* HUD HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-black/10 pb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-[#f97316] text-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest shadow-md">
                                Archive_Access
                            </span>
                            <span className="text-[10px] font-mono text-black/30 uppercase tracking-[0.3em]">
                                User_ID // {userId.slice(-8).toUpperCase()}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif italic text-black leading-none uppercase tracking-tighter">
                            Orders
                        </h1>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest">
                            Total_Transmissions: {orders.length}
                        </p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-black/5 rounded-xl">
                        <p className="font-mono text-xs uppercase tracking-[0.4em] text-black/20 italic">
                            No_Orders_Found_In_Log
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {orders.map((order, index) => (
                            <div
                                key={order.orderNumber}
                                className="group relative bg-white border border-black/5 p-6 md:p-10 transition-all hover:border-[#f97316]/30 shadow-sm"
                            >
                                {/* ORDER INDEX NODE */}
                                <span className="absolute top-4 left-4 text-[9px] font-mono text-black/20 font-bold">
                                    RECORD_0{index + 1}
                                </span>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    
                                    {/* LEFT SIDE: TELEMETRY DATA */}
                                    <div className="lg:col-span-4 space-y-8 border-r border-black/5 pr-6">
                                        <div>
                                            <label className="text-[9px] font-mono text-[#f97316] uppercase tracking-widest block mb-2 font-bold">
                                                Transmission_ID
                                            </label>
                                            <p className="font-mono text-sm text-black break-all font-bold">
                                                {order.orderNumber}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-start">
                                            <div>
                                                <label className="text-[9px] font-mono text-black/40 uppercase tracking-widest block mb-1">Date_Stamp</label>
                                                <p className="text-sm font-serif italic text-black">
                                                    {new Date(order._createdAt).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <label className="text-[9px] font-mono text-black/40 uppercase tracking-widest block mb-1 font-bold">Status</label>
                                                <div className="flex items-center gap-2 justify-end">
                                                    <span className={`size-1.5 rounded-full animate-pulse ${order.status === "paid" ? "bg-green-500" : "bg-[#f97316]"}`} />
                                                    <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${order.status === "paid" ? "text-green-600" : "text-black"}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-black/5">
                                            <label className="text-[9px] font-mono text-black/40 uppercase tracking-widest block mb-1 font-bold">Financial_Value</label>
                                            <p className="text-3xl font-mono font-bold text-black leading-none">
                                                {formatCurrency(order.totalPrice ?? 0, order.currency)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE: PRODUCT MANIFEST */}
                                    <div className="lg:col-span-8">
                                        <label className="text-[9px] font-mono text-black/40 uppercase tracking-widest block mb-6 font-bold">Manifest_Items</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {order.products?.map((product) => (
                                                <div 
                                                    key={product.product?._id}
                                                    className="flex items-center gap-4 bg-[#F9F9F9] p-4 border border-black/5 group-hover:bg-white transition-colors"
                                                >
                                                    {/* IMAGE CONTAINER - REMOVED WHITE BG AND BORDER */}
                                                    <div className="relative h-20 w-20 flex-shrink-0">
                                                        {product.product?.images?.[0] && (
                                                            <Image
                                                                src={imageUrl(product.product.images[0]).url()}
                                                                alt={product.product?.name || 'Item'}
                                                                fill
                                                                className="object-contain p-2 group-hover:scale-105 transition-transform duration-[1s]"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="text-[9px] font-mono text-[#f97316] uppercase mb-1">QTY: {product.quantity || "1"}</p>
                                                        <p className="text-sm font-serif italic text-black truncate leading-tight">
                                                            {product.product?.name}
                                                        </p>
                                                        <p className="text-[10px] font-mono text-black/30 mt-1">
                                                            UNIT_{product.product?.price?.toFixed(2)}
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