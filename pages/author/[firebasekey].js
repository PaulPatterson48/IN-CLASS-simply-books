import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getAuthDetails = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  useEffect(() => {
    getAuthDetails();
  }, [firebaseKey]);

  return (
    <div>{authorDetails.books?.map((author) => (
      <BookCard obj={author.firebasekey} onUpdate={getAuthDetails} />
    ))}

    </div>
  );
}
