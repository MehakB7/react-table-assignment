import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy, useFilters } from "react-table";
import { SingleFilter } from "../../components/Filters/SingleList";
import SearchBox from "../../components/Search/searchFIlter";
import "./productView.scss";

export const Table = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Product",
        accessor: "title",
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: "Price",
        accessor: "price",
        disableGlobalFilter: true,
        disableFilters: true,
      },
      {
        Header: "Brand",
        accessor: "brand",
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: "Category",
        accessor: "category",
        disableSortBy: true,
        Filter: SingleFilter,
        disableGlobalFilter: true,
      },
    ],
    []
  );
  const memoizeData = useMemo(() => data, []);
  const defaultColumn = useMemo(
    () => ({
      Filter: SingleFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    rows,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data: memoizeData,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );
  return (
    <div className="product_container">
      <SearchBox
        filter={state.globalFilter}
        setFilter={setGlobalFilter}
      ></SearchBox>
      <table {...getTableProps()} className="product_table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                console.log("colums", column);

                return (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.canSort && (
                      <span className="product_table__filter_container">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "⬇"
                            : "⬆"
                          : " ↕️"}
                      </span>
                    )}

                    <span className="product_table__filter_container">
                      {column.canFilter && !column.disableFilters
                        ? column.render("Filter")
                        : null}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
