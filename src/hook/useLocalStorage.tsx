// This line indicates that this code is meant to run on the client-side (in the browser)
"use client";

// Import necessary functions from React
import { useEffect, useState } from "react";

// Define a type for the value setter function
// This is part of TypeScript, which adds type checking to JavaScript
type SetValue<T> = T | ((val: T) => T);

// Define a custom function (called a "hook" in React) named useLocalStorage
// <T> means it can work with any data type
// It takes a key (like a label) and an initial value as inputs
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void] {
  // Create a state variable to store our value
  // useState is a React function that helps manage changing data
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Check if we're in a browser environment
      if (typeof window !== "undefined") {
        // Try to get a value from the browser's local storage using the provided key
        const item = window.localStorage.getItem(key);
        // If a value was found, convert it from a string to a JavaScript object
        // If no value was found, use the initialValue
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      // If there's an error (like invalid data in storage), log it and use the initialValue
      console.log(error);
      return initialValue;
    }
  });

  // useEffect is another React function that runs code when certain values change
  useEffect(() => {
    try {
      // Prepare the value to be stored
      // If it's a function, call it; otherwise, use it as-is
      const valueToStore =
        typeof storedValue === "function"
          ? storedValue(storedValue)
          : storedValue;
      // Check if we're in a browser environment
      if (typeof window !== "undefined") {
        // Save the value to the browser's local storage
        // Convert the value to a string before storing
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // If there's an error while saving, log it
      console.log(error);
    }
  }, [key, storedValue]); // This effect runs when 'key' or 'storedValue' changes

  // Return the current value and a function to update it
  return [storedValue, setStoredValue];
}

// Make this function available for use in other parts of the application
export default useLocalStorage;