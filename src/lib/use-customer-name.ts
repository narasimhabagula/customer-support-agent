import { useEffect, useState } from "react";
import { customer } from "./demo-data";

const KEY = "helpmind:customer-name";

export function useCustomerName() {
  const [name, setName] = useState<string>(customer.firstName);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored) setName(stored);
  }, []);

  const save = (value: string) => {
    setName(value);
    window.localStorage.setItem(KEY, value);
  };

  return { name, setName: save };
}

export function storeCustomerName(value: string) {
  window.localStorage.setItem(KEY, value);
}

export function clearCustomerName() {
  window.localStorage.removeItem(KEY);
}
