import React from "react";
import Ratings from "../components/ui/Ratings";
import Price from "../components/ui/Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BestBooks from "../components/ui/BestBooks";
import { Link, useParams } from "react-router-dom";

const BookInfo = ({ books, addItemToCart, cart }) => {
  const { id } = useParams();
  const book = books.find((book) => +book.id === +id);
  // const [added, setAdded] = useState(false);
  // the + on the id and bookid lets it find the numerical value of the id, cause boolean of === determines STRINGS, with + it now finds the value of the number

  //this part was not included in the file guide, I guess adlib, this contains a change from add to cart into checkout that directs the interface at the checkout page
  function addBookToCart(book) {
    // setAdded(true)
    addItemToCart(book);
  }

  //removes the checkout function to unchosen books that are still not added to cart, so if chosen book is added to cart, then checkout shows, otherwise like finding other books, add to cart will display again
  function bookOnCart() {
    return cart.find((book) => book.id === +id);
  } // for this called cart to work, it should also be received/returnedIthink back to App.js, FSE discord very helpful bros

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/books" className="book__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="/books" className="book__link">
                <h2 className="book__selected--title--top">Books</h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img className="book__selected--img" src={book.url} alt="" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{book.title}</h2>
                <Ratings rating={book.rating} />
                <div className="book__selected--price">
                  <Price
                    originalPrice={book.originalPrice}
                    salePrice={book.salePrice}
                  />
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam, repellendus modi odio porro, consequuntur,
                    asperiores minima sint voluptatem at reiciendis ducimus
                    neque provident alias iure nihil explicabo nobis id
                    voluptas.
                  </p>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam, repellendus modi odio porro, consequuntur,
                    asperiores minima sint voluptatem at reiciendis ducimus
                    neque provident alias iure nihil explicabo nobis id
                    voluptas.
                  </p>
                </div>
                {bookOnCart() ? (
                  <Link to={`/cart`} className="book__link">
                    <button className="btn">Checkout now</button>
                  </Link>
                ) : (
                  <button className="btn" onClick={() => addBookToCart(book)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="book__selected--title--top">Recommended Books</h2>
            </div>
            <BestBooks id={id} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookInfo;
