import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form, { FloatingLabel, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAuthor, updateAuthor } from '../../api/authorData';

const initialState = {
  email: '',
  favorite: '',
  first_name: '',
  last_name: '',
  uid: '',
};

function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/author/${obj
        . firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/authors');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      <FloatingLabel controlId="floatingInput1" label="email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter email address"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="favorite"
        className="mb-3"
      >
        <Form.Check
          type="switch"
          placeholder="Is this one of your favorites"
          name="favorite"
          label="Favorite?"
          checked={formInput.favorite}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              favorite: e.target.checked,
            }));
          }}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput3"
        label="first_name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="First Name"
          name="first_name"
          value={formInput.first_name}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput4"
        label="last_name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={formInput.last_name}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update Author' : 'Create Author'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    uid: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: initialState,
};

export default AuthorForm;
