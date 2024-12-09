import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debounceSearch, setDebounceSearch] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Callback được gọi
      // Lấy giá trị từ input và cập nhật vào state
      setDebounceSearch(value);
    }, delay);
    // Cleanup function (Dọn dẹp bộ nhớ trước khi component bị unmount)
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debounceSearch;
}
