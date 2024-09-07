// Import necessary React hooks
import React, { useRef, useEffect } from "react";

// Define the props interface for the component
// This specifies what props the component expects and their types
interface Props {
  children: React.ReactNode; // The content to be wrapped by this component
  exceptionRef?: React.RefObject<HTMLElement>; // An optional ref to an element that should be excluded from outside clicks
  onClick: () => void; // A function to be called when a click outside occurs
  className?: string; // An optional CSS class name for styling
}

// Define the ClickOutside component using React.FC (Functional Component) with the Props interface
const ClickOutside: React.FC<Props> = ({
  children,
  exceptionRef,
  onClick,
  className,
}) => {
  // Create a ref for the wrapper element using useRef hook
  // This ref will be attached to the div that wraps the children
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Use the useEffect hook to handle side effects (in this case, event listeners)
  useEffect(() => {
    // Define the function to handle click events
    const handleClickListener = (event: MouseEvent) => {
      let clickedInside: null | boolean = false;
      
      if (exceptionRef) {
        // If an exception ref is provided, check if the click is:
        // 1. Inside the wrapper element
        // 2. On the exception element itself
        // 3. Inside the exception element
        clickedInside =
          (wrapperRef.current &&
            wrapperRef.current.contains(event.target as Node)) ||
          (exceptionRef.current && exceptionRef.current === event.target) ||
          (exceptionRef.current &&
            exceptionRef.current.contains(event.target as Node));
      } else {
        // If no exception ref, only check if the click is inside the wrapper element
        clickedInside =
          wrapperRef.current &&
          wrapperRef.current.contains(event.target as Node);
      }

      // If the click was not inside (i.e., it was outside), call the onClick function
      if (!clickedInside) onClick();
    };

    // Add the event listener for mousedown events to the entire document
    document.addEventListener("mousedown", handleClickListener);

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]); // Re-run effect if exceptionRef or onClick changes

  // Render the component
  // The wrapper div is given the ref and any provided className
  // The children are rendered inside this wrapper
  return (
    <div ref={wrapperRef} className={`${className || ""}`}>
      {children}
    </div>
  );
};

// Export the component so it can be used in other parts of the application
export default ClickOutside;

/* In simple terms, this code creates a reusable component called ClickOutside that detects when a user clicks outside of a specific area on a webpage.

Here's what it does:
1.
It wraps around other content (like a menu or popup).
2.
It listens for clicks anywhere on the page.
3.
If a click happens outside the wrapped content, it triggers a specified action.
4.
It can also ignore clicks on certain elements if needed.


You would use this component in situations like:
1.
Closing a dropdown menu when clicking elsewhere on the page.
2.
Dismissing a popup or modal dialog when clicking outside of it.
3.
Hiding a tooltip or information box when the user clicks away.


This component makes it easier to add this common behavior to different parts of your website without having to write the same code over and over again. */