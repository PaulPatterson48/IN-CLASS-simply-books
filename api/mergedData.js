import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook, getBooks } from './bookData';
import { getOrderBooks } from './orderBookData';
import { getSingleOrder } from './orderData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
    .then(([authorObject, authorBooksArray]) => {
      resolve({ ...authorObject, books: authorBooksArray });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

// TO RENDER MY ORDER WITH ALL ORDERBOOKS LISTED
const getOrderDetails = async (orderId) => {
  // GET ORDER
  const order = await getSingleOrder(orderId);

  // GET ALL ORDERBOOKS RELATED TO ORDER
  const allOrderBooks = await getOrderBooks(orderId);

  // GET THE BOOKS FOUND IN THE ORDER BOOKS, RETURNS AN ARRAY OF PROMISES
  const getSingleBooks = await allOrderBooks.map((orderBook) => getSingleBook(orderBook.bookId));

  // MOST USE PROMISE.ALL() TO RETURN EACH BOOK OBJECT
  const orderBooks = await Promise.all(getSingleBooks);

  // RETURNS THE SINGLE ORDER AND ALL BOOKS FOUND RELATED TO ORDER
  return { ...order, orderBooks };
};

// GET BOOKS NOT RELATED TO AN ORDER
const getBooksNotInTheOrder = async (uid, orderId) => {
  // GET ALL THE BOOKS
  const allBooks = await getBooks(uid);

  // GET ALL THE ORDERBOOKS RELATES TO THE ORDER
  const orderBooks = await getOrderBooks(orderId);

  // GET THE BOOKS FOUND IN THE ORDER BOOKS, RETURNS AN ARRAY OF PROMISES
  const bookPromises = await orderBooks.map((orderBook) => getSingleBook(orderBook.bookId));

  // MOST USE PROMISE.ALL() TO RETURN EACH BOOK OBJECT
  const books = await Promise.all(bookPromises);

  // FILTER AND COMPARE THE TWO ARRAYS OF ALL BOOKS AND ALL ORDERBOOKS
  const filterBooks = await allBooks.filter((obj) => !books.some((e) => e.firebaseKey === obj.firebaseKey));

  // ONLY RETURN THE BOOKS NOT RELATED TO ORDER
  return filterBooks;
};

export {
  viewBookDetails, viewAuthorDetails, deleteAuthorBooks, getOrderDetails, getBooksNotInTheOrder,
};
