/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getOrders } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';
import OrderCard from '../components/OrderCard';

function ShowOrders() {
  // TODO: Set a state for books
  const [orders, setOrder] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheOrders = () => {
    getOrders(user.uid).then(setOrder);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheOrders();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/order/new" passHref>
        <Button>Add A Order</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {orders.map((order) => (
          <OrderCard key={order.firebaseKey} orderObj={order} onUpdate={getAllTheOrders} />
        ))}
      </div>
    </div>
  );
}

export default ShowOrders;
