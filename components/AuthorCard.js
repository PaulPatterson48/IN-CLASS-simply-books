import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleAuthor } from '../api/authorData';

function AuthorCard({ obj, onUpdate }) {
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${obj.first_name}?`)) {
      deleteSingleAuthor(obj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margi: '10px' }}>
      <Card.Img variant="top" src={obj.image} alt={[obj.first_name, obj.last_name]} style={{ height: '400px' }} />
      <h6>{obj.email} </h6>
      <Card.Body>
        <Card.Title>{obj.first_name} {obj.last_name}</Card.Title>
        <Link href={`/author/edit/${obj.first_name} ${obj.last_name} ${obj.favorite}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Link href={`/author/edit/${obj.first_name} ${obj.last_name}`} passHref>
          <Button variant="danger" onClick={deleteThisAuthor} classNam="m-2">DELETE</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
