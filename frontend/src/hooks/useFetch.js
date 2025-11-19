import { useEffect, useState } from "react";
import api from "../api/axios.js";

const useFetch = (url, deps = []) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .get(url)
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => console.error(err));
    return () => {
      mounted = false;
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return data;
};

export default useFetch;
