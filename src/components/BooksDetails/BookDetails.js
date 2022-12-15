import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";

export const BookDetails = ({ books }) => {
  const { id } = useParams();
  const bookDetails = useRef();

  // useEffect(() => {
  //   console.log(bookDetails.current.getBoundingClientRect()); 
  // }, []);

  if (books.items.length === 0) {
    return <h1 style={{ textAlign: "center" }}>Search book first</h1>;
  }

  const book = books.items.find((book) => book.id === id);

  return (
    <>
      <div className={styles["book-details"]} ref={bookDetails}>
        <div className={styles["book-image"]}>
          {book.volumeInfo.imageLinks && (
            <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt="Book" />
          )}
        </div>
        <div className={styles["book-info"]}>
          {book.volumeInfo.categories && (
            <span>{book.volumeInfo.categories[0]}</span>
          )}
          {book.volumeInfo.title && <h1>{book.volumeInfo.title}</h1>}
          {book.volumeInfo.authors && (
            <span style={{ color: "gray", textDecoration: "underline" }}>
              {book.volumeInfo.authors[0]}
            </span>
          )}
          {book.volumeInfo.description && (
            <div style={{ padding: 20, border: "1px solid lightgray", marginTop: 20, height: 300, overflowY: "auto" }}>
              <span style={{}}>{book.volumeInfo.description}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
