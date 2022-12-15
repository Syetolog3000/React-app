import React, { useEffect, useState } from "react";
import { Books } from "./components/Books/Books";
import { Search } from "./components/Search/Search";
import { Routes, Route } from "react-router-dom";
import { BookDetails } from "./components/BooksDetails/BookDetails";

export const App = () => {
  const [books, setBooks] = useState({
    items: [],
    kind: "",
    totalItems: 0,
    isFirstLoad: true,
  });

  useEffect(() => console.log(books), [books])

  const [isLoading, setIsLoading] = useState(false);

  const [startIndex, setStartIndex] = useState(0);

  return (
    <>
      <Search
        setBooks={setBooks}
        books={books}
        startIndex={startIndex}
        setIsLoading={setIsLoading}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Books
              books={books}
              setStartIndex={setStartIndex}
              isLoading={isLoading}
            />
          }
        ></Route>
        <Route path="/book/:id" element={<BookDetails books={books} />}></Route>
      </Routes>
    </>
  );
};
