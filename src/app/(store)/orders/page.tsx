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
    <div className="py-24">
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tight py-12">Tracking Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center text-neutral-600">
              <p>You have not placed an order yet.</p>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8 w-full max-w-2xl">
              {orders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="p-4 sm:p-6 border border-gray-200 rounded-md"
                >
                  <div className="">
                    <div>
                      <div className="text-sm font-semibold text-neutral-700">Order Number</div>
                      <div className="text-green-600 text-sm">{order.orderNumber}</div>
                    </div>
                    <div className="text-sm font-semibold text-neutral-700 mt-8">Order Date</div>
                    <div className="text-sm text-gray-500">
                      {new Date(order._createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <hr className='my-4 text-neutral-300' />
                  </div>
                  <div className='flex items-center'>
                    <span className='text-sm mr-2'>Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${order.status == "paid" ? "bg-green-200 text-green-600" : "bg-gray-100 text-gray-800"}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-neutral-700 mt-8">Total Amount</div>
                  <div className="mt-2 text-sm text-gray-600">
                    {formatCurrency(order.totalPrice ?? 0, order.currency)}
                  </div>
                  <hr className='my-4 text-neutral-300' />
                  <div className="text-sm font-semibold text-neutral-700 mt-8">Order Items</div>
                  {
                    order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className='flex flex-col sm:flex-row sm:itemscenter sm: justify-between gap-3 py-2 border-b last:border-b-0'>
                        <div className='relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 roundedmdoverflow-hidden'>
                          {product.product?.images?.[0] && (
                            <Image
                              src={imageUrl(product.product.images[0]).url()}
                              alt={product.product?.name || 'Product image'}
                              fill
                              className="object-cover"
                            />
                          )}

                        </div>
                        <div className='w-40'>
                          <div className='text-sm text-neutral-700 mt-2'>
                            Quantity: {product.quantity || "N?A"}
                          </div>
                          <div className="text-sm font-semibold text-neutral-700">{product.product?.name}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default OrdersPage;
