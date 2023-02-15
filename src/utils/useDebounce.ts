import { useState, useEffect } from 'react';
import { Params } from "../App"

export const useDebounce = (value: Params, delay: number) => {

       const [debouncedValue, setDebouncedValue] = useState(value);

       useEffect(() => {
              const handler = setTimeout(() => {
                     setDebouncedValue(value);
              }, delay);
              return () => {
                     clearTimeout(handler);
              };
       }, [value]);
       return debouncedValue;
}