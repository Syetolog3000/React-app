import React from "react";
import { Book } from "../Book/Book";
import styles from "./Books.module.css";

export const Books = ({ books, setStartIndex, isLoading }) => {
  const increaseStartIndex = () =>
    setStartIndex((startIndex) =>
      startIndex + 30 < books.totalItems ? startIndex + 30 : startIndex
    );

  return (
    <div>
      {!books.isFirstLoad ? (
        <>
          <h3 className={styles["title"]}>Found {books.totalItems} results</h3>
          <div className={styles["books"]}>
            {books.items.length > 0 &&
              books.items.map((book) => <Book key={book.etag} book={book} />)}
          </div>
          {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
          <div className={styles["load"]}>
            <button onClick={increaseStartIndex}>Load more</button>
          </div>
        </>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>
            {isLoading ? "Loading..." : "Type something to search"}
          </h1>
        </>
      )}
    </div>
  );
};
