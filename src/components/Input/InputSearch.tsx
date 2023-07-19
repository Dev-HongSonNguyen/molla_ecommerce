import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { searchProduct } from "../../api/search";
import { Link } from "react-router-dom";
const InputSearch = () => {
  const [valueSearch, setValueSearch] = useState("");
  const debouncedValue = useDebounce<string>(valueSearch, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
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
    <div>
      <form action="" className="header-between-search relative">
        <input
          type="text"
          placeholder="Search product..."
          onChange={handleChange}
          value={valueSearch}
        />
        <button>
          <span className="material-icons">search</span>
        </button>
        <p className="absolute z-10 bg-[#f8f8f8] top-[50px] w-full">
          {isLoading ? (
            <p>Loading...</p>
          ) : valueSearch && resultSearch.length > 0 ? (
            resultSearch.map((item: any) => {
              return (
                <Link to={`/product/${item._id}`} key={item._id}>
                  <div className="flex items-center p-2 gap-3 hover:bg-primary rounded-lg">
                    <img className="w-[30px]" src={item.image} alt="" />
                    <p>{item.name}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="">
              <p></p>
            </div>
          )}
        </p>
      </form>
    </div>
  );
};

export default InputSearch;
