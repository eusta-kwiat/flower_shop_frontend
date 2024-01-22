"use client"
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useParams } from 'next/navigation';
import { getOrderDetails } from '../../services/api';

export default function OrderDetails() {
  const params = useParams();
  const orderId = params.orderId;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    getOrderDetails(orderId)
      .then((res) => {
        setDetails(res.data)
        console.log(res.data);
      })
      .catch((err) => {console.log(err)})
  }, []);


  return (
    <div>
      <h1>Order Details for Order ID: </h1>
      {/* Display order details as needed */}
      {/* Example: <p>{orderDetails.someField}</p> */}
    </div>
  );
}
