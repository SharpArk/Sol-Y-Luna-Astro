"use client";

import { PUBLIC_API_URL } from "astro:env/client";
import axios from "axios";
import { useState } from "react";

function LoginForm() {
  const [res, setRes] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);

      const payload = {
        username: formData.get("username"),
        password: formData.get("password"),
      };

      const response = await axios.post(
        `${PUBLIC_API_URL}/auth/login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setRes({ backResponse: response, message: "inicio de sesión exitoso" });
    } catch (err) {
      console.error("Error:", err);
      setRes({ backResponse: err, message: "inicio de sesión fallido" });
    }
  };

  const onLogOut = async (e) => {
    e.preventDefault();
    try {
      axios.post(
        `${PUBLIC_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (e) {
      setRes({ backResponse: e, message: "inicio de sesión fallido" });
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 justify-center items-center w-[500px] h-[400px] bg-white rounded-lg shadow-lg p-4"
        onSubmit={onSubmit}
      >
        <input
          className="w-full p-2 border border-gray-500 rounded text-black"
          type="text"
          placeholder="Username"
          required
          autoComplete="off"
          id="username"
          name="username"
        />
        <input
          className="w-full p-2 border border-gray-500 rounded text-black"
          type="password"
          placeholder="Password"
          autoComplete="off"
          id="password"
          name="password"
        />
        <button className="w-auto bg-amber-400 p-4 rounded-full text-black uppercase font-bold cursor-pointer">
          Iniciar Sesión
        </button>
      </form>
      <form onSubmit={onLogOut}>
        <button>Log Out</button>
      </form>
      <p>{res == null ? "" : res.message}</p>
    </>
  );
}

export default LoginForm;
