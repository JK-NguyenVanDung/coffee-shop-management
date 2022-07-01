import { Pagination } from "antd";
import { useState } from "react";

export default function MyPagination({
  props,
  setPagination,
  setLoading,
}) {
  const { page, totalDocs } = props;
  const [current, setCurrent] = useState(page ? page : 1);
  const onChange = (page, pageSize) => {
    setCurrent(page);
    setPagination({
      page: page,
      per_page: pageSize,
    });
    setLoading(true);
  };

  return (
    <Pagination  //properties
      current={current}
      total={totalDocs}
      onChange={onChange}
      pageSizeOptions={["10", "20", "30"]}
      showSizeChanger
    />
  );
}
