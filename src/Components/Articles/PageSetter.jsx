import * as React from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

function PageSetter({ page, totalPages}) {

  return (
    <Pagination
      shape="rounded"
      color="primary"
      size="large"
      siblingCount={2}
      page={page}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}

export default PageSetter;
