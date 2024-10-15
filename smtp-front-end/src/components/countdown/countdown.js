import React, { useState, useEffect } from "react";

function CountComponent({ limit, loading, setLoading, progress }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (loading && count < limit) {
      const timer = setTimeout(() => {
        setCount((prevCount) => prevCount + 1);
      }, 3000);

      // Clean up the timer on component unmount or if dependencies change
      return () => clearTimeout(timer);
    }
  }, [count, limit, loading]);

  return (
    <div className="h-96 flex justify-center items-center">
      <div className="">
        {count == limit ? (
          <div>
            <h1 className="text-green-500 text-2xl  font-bold">
              Email sent successfully
            </h1>
            <br />
            <p onClick={() => setLoading(false)}>Back to sender</p>
          </div>
        ) : (
          <h1 className="text-white text-2xl font-bold">
            Email sending ({count}/{limit}){" "}
          </h1>
        )}
      </div>
    </div>
  );
}

// Example usage
export default CountComponent;
