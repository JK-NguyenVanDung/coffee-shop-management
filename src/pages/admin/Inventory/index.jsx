import React, { useEffect, useState } from "react";
import { Form, Input, message, notification, Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

function Inventory() {
  const [loading, setLoading] = useState(false);

  function onFinish() {}

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return <div></div>;
}

export default Inventory;
