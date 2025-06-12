import React, { useState, useEffect } from "react";

export default function Icon() {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    // Define el día entre 6 am y 18 pm (puedes ajustar)
    if (hour >= 6 && hour < 18) {
      setIsDay(true);
    } else {
      setIsDay(false);
    }
  }, []);

  return (
    <div>
      {isDay ? (
        <span role="img" aria-label="sol" style={{ fontSize: "3rem" }}>
          ☀️
        </span>
      ) : (
        <span role="img" aria-label="luna" style={{ fontSize: "3rem" }}>
          🌙
        </span>
      )}
    </div>
  );
}
