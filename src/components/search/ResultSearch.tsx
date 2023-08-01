import React from "react";
import { Link } from "react-router-dom";
import LoadingSearch from "../Common/LoadingSearch";

const ResultSearch = ({
  data,
  show = true,
  loading,
}: {
  data: any;
  show: boolean;
  loading: boolean;
}) => {
  return (
    <>
      {show && (
        <div>
          {loading && <LoadingSearch />}
          {data.length > 0
            ? data.map((item: any) => (
                <Link to={`/product/${item._id}`} key={item._id}>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary">
                    <img className="w-[30px]" src={item.image} alt="" />
                    <p>{item.name}</p>
                  </div>
                </Link>
              ))
            : !loading && (
                <div className="px-3 py-3 text-[12px]">No product !</div>
              )}
        </div>
      )}
    </>
  );
};

export default ResultSearch;
