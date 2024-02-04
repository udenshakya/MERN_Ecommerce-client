import {useTable,Column,TableOptions,useSortBy,usePagination,
} from "react-table";

const TableHOC = <T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination:boolean=false
) => {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState:{
        pageSize:5,
      }
    };

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,nextPage,previousPage,canNextPage,canPreviousPage,pageCount,state:{pageIndex} } =
      useTable(options, useSortBy, usePagination);

    return (
      <div className={containerClassname}>
        <h2 className="heading text-center mb-10 text-xl font-bold">{heading} </h2>
        <table className="table w-full h-9 overflow-auto" {...getTableProps()}>
          <thead className="p-2 border-b-2">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>{column.isSortedDesc ? "⬇️" : "⬆️"} </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="p-2 border-b-2" {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      className="p-4 image h-[50px] w-[100px] border-b-2 "
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {
          showPagination && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button className="rounded-xl bg-blue-300 px-3 py-1" disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
              <span>{`${pageIndex+1} page of ${pageCount}`} </span>
              <button className="rounded-xl bg-blue-300 px-3 py-1" disabled={!canNextPage} onClick={nextPage}>Next</button>
            </div>
          )
        }
      </div>
    );
  };
};

export default TableHOC;
