import React, { useEffect, useState } from "react";
import { Table } from "./ProductList/ProductView";
import "./section.scss";

export const Section = (props) => {
  const [{ data, error, loading }, setState] = useState({
    data: [],
    error: "",
    loading: false,
  });
  useEffect(() => {
    const fetchProducts = async () => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setState((prev) => ({
          ...prev,
          data: data?.products || [],
          loading: false,
        }));

        console.log("inside data", data);
      } catch (error) {
        setState((prev) => ({ ...prev, error: error.message, loading: false }));
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="section">
      <h2>Product List</h2>
      {loading && <div className="loading">fetching product data...</div>}{" "}
      {data.length > 0 && <Table data={data} />}
      {error && <div> {error}</div>}
    </div>
  );
};
