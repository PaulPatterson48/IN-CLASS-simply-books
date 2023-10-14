import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../api/orderData';
import OrderForm from '../../../components/forms/OrderForm';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleOrder(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<OrderForm obj={editItem} />);
}
