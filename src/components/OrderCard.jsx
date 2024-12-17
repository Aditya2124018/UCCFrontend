import React, { useContext } from 'react'
import { AppContext } from '../context/Contexts';

export default function OrderCard({ order }) {
    const { getDate } = useContext(AppContext)
    return (

        <>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 flex items-center border border-gray-200 mt-4">
                {/* Item Image */}
                <div className="w-20 h-20 flex-shrink-0">
                    <img
                        src={order?.item?.imageURL}
                        alt={order?.item?.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Order Information */}
                <div className="ml-4 flex-grow">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold text-primary truncate">{order?.item?.name}</h2>

                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <p className="text-gray-500">Order Date</p>
                            <p className="font-medium">{getDate(order?.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Order Amount</p>
                            <p className="font-medium">₹{order?.item?.price.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Order Status</p>
                            <span
                                className={`badge badge-md badge-outline 
                ${(order?.order_status === "Pending") ? "text-yellow-500 text-sm" :
                                        (order?.order_status === "Cancelled") ? "text-red-500 text-sm" :
                                            (order?.order_status === "Completed") ? "text-green-500 text-sm" : ""
                                    } p-[8px]`}
                            >
                                {order?.order_status}
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-500">Payment Status</p>
                            <span
                                className={`badge badge-md badge-outline ${order?.payment_status == "Pending" ? "text-yellow-500 text-sm" :
                                        order?.payment_status == "Completed" ? "text-green-500 text-sm" : ""
                                    } p-[8px]`}
                            >
                                {order?.payment_status}
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-500">Customer Name</p>
                            <p className="font-medium">{order?.user?.fname + " " + order?.user?.lname}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Item Type</p>
                            <p className="font-medium"><span className="badge badge-outline text-xs">{order.item?.type}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
