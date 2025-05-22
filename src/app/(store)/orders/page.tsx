import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getMyOrders } from '@/sanity/lib/orders/getOrders'
import Container from '@/components/ui/container'
import { MY_QUERY_ORDERSResult } from '../../../../sanity.types'
import { formatCurrency } from '@/lib/formatCurrency'

interface Order {
  orderNumber: string;
  _createdAt: string;
  status?: string;
  items?: Array<any>; // or a specific item type
}

const OrdersPage = async () => {
  const {userId} = await auth();

  if (!userId) {
    redirect("/");
  }

  const orders:MY_QUERY_ORDERSResult = await getMyOrders(userId);

  return (
    <div className="py-24">
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tight mb-6">My Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center text-neutral-600">
              <p>You have not placed an order yet.</p>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8 w-full max-w-2xl">
              {orders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="p-4 sm:p-6 border border-gray-200 rounded-md shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">Order Number</div>
                      <div className="font-semibold text-lg">{order.orderNumber}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(order._createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  {/* Optional: More order info */}
                  <div className="mt-2 text-sm text-gray-600">
                    {formatCurrency(order.totalPrice ?? 0, order.currency)}
                  </div>
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
