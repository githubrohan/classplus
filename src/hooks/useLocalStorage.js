import { useState } from "react";
export function useLocalStorage(key, initialValue) {
  // State to store our value

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function
  const setValue = (value) => {
    try {
      const valueToStore = [value, ...storedValue];

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  const setQueryDelete = (query) => {
    try {
      var index = storedValue.indexOf(query);
      console.log(index);
      if (index > -1) {
        storedValue.splice(index, 1);
      }
      setStoredValue(storedValue);

      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue, setQueryDelete];
}
