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
    <>
      <span className="text-[3rem]" role="img" aria-label="sol">
        {isDay ? <>☀️</> : <>🌙</>}
      </span>
    </>
  );
}
