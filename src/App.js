import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import { books } from "./data";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import { counter } from "@fortawesome/fontawesome-svg-core";

function App() {
  const [cart, setCart] = useState([]);

  // ...couldBeAnything the '...' is called a spread operator
  function addItemToCart(book) {
    const dupeItem = cart.find((item) => item.id === book.id);
    setCart(
      (oldCart) =>
        dupeItem
          ? [
              ...oldCart.map((item) => {
                return item.id === dupeItem.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1, //from my understanding, this part counts the chosen book added to the cart at the nav bar with the red circle counter
                    }
                  : item;
              }),
            ]
          : [...oldCart, { ...book, quantity: 1 }] //this part works as the 'else' part of the function, this fills the cart instead of the natural occurrence of the undefined. Idk why but normally in this situation and execution, when initially adding a book to cart, it always return undefined first, but this is the fix
    ); // ...book contains every detail of the chosen book aka: title, price, etc
    //very important addition i think,  { ...book, quantity: 1 } this thing means that spread operator is used to book to allow us to add other variables such as QUANTITY without breaking the original source of the 'book', in this situation, no spread ... website breaks error nono
  }

  // I think this is changeQuantity, yeah compirmed
  function updateCart(item, newQuantity) {
    setCart((oldCart) =>
      oldCart.map((oldItem) =>
        oldItem.id === item.id
          ? {
              ...oldItem,
              quantity: newQuantity,
            }
          : oldItem
      )
    );
  }

  //this function also serves the Cart.jsx file to enable the remove function in the checkout page
  function removeItem(item) {
    setCart((oldCart) => oldCart.filter((cartItem) => cartItem.id !== item.id));
  } // basically the remove command works by manipulating the filter function, we use filter, then we set the command to filter the book and make it NOT EQUAL to the one looked for, thenn it will be filtered out
  //brief explanation, use your logic gads skill here: [1, 2, 3, 4].filter(num => num !== 3)    it sends an array of [1, 2, 4]
  //if we use === 3, then it returns an array of [3], not what we want btw

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += +item.quantity;
    });
    return counter;
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += +item.quantity;
    });
    return counter;
  }

  //everything under total inside the checkout page from cart.jsx function is here, that is why its not on cart.jsx
  function calcPrices() {
    let total = 0;
    cart.forEach((item) => {
      total += (item.salePrice || item.originalPrice) * item.quantity;
    });
    return {
      subtotal: total * 0.9,
      tax: total * 0.1,
      total,
    };
  }

  return (
    <Router>
      <div className="App">
        {/* putting {numberOfItems} only calls ONLY the function, with {numberOfItems()}, it runs the function inside of it  */}
        <Nav numberOfItems={numberOfItems()} />
        <Route path="/" exact render={() => <Home books={books} />} />
        <Route path="/books" exact render={() => <Books books={books} />} />
        <Route
          path="/books/:id"
          render={() => (
            <BookInfo books={books} addItemToCart={addItemToCart} cart={cart} />
          )}
        />
        <Route
          path="/cart"
          render={() => (
            <Cart
              cart={cart}
              updateCart={updateCart}
              removeItem={removeItem}
              totals={calcPrices()}
            />
          )}
        />
        <Footer />
      </div>
    </Router>
  ); //the books={books} or cart={cart} enables the website to run the api dynamically instead of hardcoding every single one, how it works umm yah I think it calls from the respective jsx file so they are connected and idk which one is connected to the api, both? idk
}

export default App;
