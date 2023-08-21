import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { searchProduct } from "../../api/search";
import { Link } from "react-router-dom";
import ResultSearch from "../search/ResultSearch";
import useClickOutSide from "../hooks/useClickOutSIde";
const InputSearch = () => {
  const [valueSearch, setValueSearch] = useState("");
  const debouncedValue = useDebounce<string>(valueSearch, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const { show, setShow, nodeRef } = useClickOutSide(".search-header");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debouncedValue) {
          setIsLoading(true);
          const response = await searchProduct(debouncedValue);
          setResultSearch(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    void fetchData();
  }, [debouncedValue]);
  return (
    <form action="" className="header-between-search relative">
      <input
        ref={nodeRef}
        onClick={() => {
          setShow(!show);
        }}
        type="text"
        placeholder="Search product..."
        onChange={handleChange}
        value={valueSearch}
      />
      <button>
        <span className="material-icons">search</span>
      </button>
      <div className="absolute z-20 bg-[#f8f8f8] top-[50px] w-full">
        <ResultSearch
          data={resultSearch}
          show={show}
          loading={isLoading}
        ></ResultSearch>
      </div>
    </form>
  );
};

export default InputSearch;
