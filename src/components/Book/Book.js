import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Book.module.css";

export const Book = ({ book }) => {
  return (
    <NavLink to={"/book/" + book.id}>
      <div className={styles["book"]}>
        <div className={styles["book-image"]}>
          {book.volumeInfo.imageLinks && (
            <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt="Book" />
          )}
        </div>
        <div className={styles["book-desc"]}>
          <div className={styles["category"]}>
            {book.volumeInfo.categories && (
              <span> {book.volumeInfo.categories[0]}</span>
            )}
          </div>
          <div className={styles["title"]}>
            {book.volumeInfo.title && <span> {book.volumeInfo.title}</span>}
          </div>
          <div className={styles["author"]}>
            {book.volumeInfo.authors && <span> {book.volumeInfo.authors[0]}</span>}
          </div>
        </div>
      </div>
    </NavLink>
  );
};
