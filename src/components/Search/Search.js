import React, { useEffect, useRef, useState } from "react";
import { SearchParam } from "../SearchParam/SearchParam";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.css";
import BackgroundImage from "../../assets/backgroundHeader.JPG";
import iconBooks from "../../assets/iconBooks.png";
import iconSearch from "../../assets/iconBooksSearch.png";

export const Search = ({ setBooks, startIndex, books, setIsLoading }) => {
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    category: "all",
    orderBy: "relevance",
  });

  const inputRef = useRef(null);

  const categories = [
    {
      id: 0,
      name: "all",
    },
    {
      id: 1,
      name: "art",
    },
    {
      id: 2,
      name: "biography",
    },
    {
      id: 3,
      name: "computers",
    },
    {
      id: 4,
      name: "history",
    },
    {
      id: 5,
      name: "medical",
    },
    {
      id: 6,
      name: "poetry",
    },
  ];

  const orderBy = [
    {
      id: 0,
      name: "relevance",
    },
    {
      id: 1,
      name: "newest",
    },
  ];

  const loadBooks = async () => {
    let value = inputRef.current.value.trim();

    if (value === "") return books;

    setIsLoading(true);

    let query = `https://www.googleapis.com/books/v1/volumes?q=${value}`;

    if (options.category !== "all") query += `+subject:${options.category}`;

    query += `&maxResults=30&startIndex=${startIndex}&orderBy=${options.orderBy}`;

    const response = await fetch(query);
    const json = await response.json();

    setIsLoading(false);

    if (json.items === undefined) {
      return { ...json, items: [] };
    }

    return json;
  };

  const loadMore = async () => {
    const json = await loadBooks();
    setBooks((books) => ({ ...books, items: [...books.items, ...json.items] }));
  };

  //https://www.googleapis.com/books/v1/volumes?q=dima
  // +subject:art&maxResults=30&startIndex=0&
  // orderBy=relevance

  useEffect(() => {
    if (startIndex !== 0) loadMore();
  }, [startIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = await loadBooks();
    setBooks(json);
    navigate("/");
  };

  const handleCategoryChange = (value) =>
    setOptions({ ...options, category: value });

  const handleOrderByChange = (value) =>
    setOptions({ ...options, orderBy: value });

  return (
    <div className={styles["head"]}>
      <img className={styles["back-image"]} src={BackgroundImage} alt="" />
      <div className={styles["title"]}>
        Search for books
        <img src={iconBooks} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles["input-img"]}>
          <input
            className={styles["search-input"]}
            ref={inputRef}
            placeholder="Search"
          ></input>
          <img onClick={handleSubmit} src={iconSearch} alt="" />
        </div>
      </form>
      <div className={styles["settings-search"]}>
        <div className={styles["categories"]}>
          <SearchParam
            name={"Categories  "}
            array={categories}
            onChange={handleCategoryChange}
          />
        </div>
        <div className={styles["sort"]}>
          <SearchParam
            name={"Sort by  "}
            array={orderBy}
            onChange={handleOrderByChange}
          />
        </div>
      </div>
    </div>
  );
};
