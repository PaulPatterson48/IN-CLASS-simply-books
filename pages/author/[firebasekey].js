import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
import AuthorCard from '../../components/AuthorCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getAuthDetails = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  useEffect(() => {
    getAuthDetails();
  }, []);

  return (
    <div>{authorDetails.books?.map((book) => (
      <AuthorCard bookObj={book} onUpdate={getAuthDetails} />
    ))}

    </div>
  );
}
