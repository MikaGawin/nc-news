import * as React from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

function PageSetter({ searchParams, setSearchParams, page, totalPages}) {
  const currentPage = page === null? 1 : page
 const currentTotal = isNaN(totalPages)? 1 : totalPages

  function handlePageChange(event, value){
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", value)
    setSearchParams(newParams)
  }

  return (
    <Pagination
      shape="rounded"
      color="primary"
      size="large"
      siblingCount={2}
      page={currentPage}
      count={currentTotal}
      onChange={handlePageChange}
      // renderItem={(item) => (
      //   <PaginationItem
      //     component={Link}
      //     to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
      //     {...item}
      //   />
      // )}
    />
  );
}

export default PageSetter;
