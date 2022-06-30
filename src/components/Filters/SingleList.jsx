import { useMemo } from "react";
import "./singleList.scss";
export const SingleFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = useMemo(() => {
    const options = [
      ...new Set(preFilteredRows.map((item) => item.values[id])),
    ];
    return options;
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => setFilter(e.target.value)}
      className="selection_list"
    >
      <option value="">All</option>
      {options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
