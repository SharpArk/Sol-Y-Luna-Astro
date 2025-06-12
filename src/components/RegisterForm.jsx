import { useState } from "react";
import { PUBLIC_API_URL } from "astro:env/client";
import axios from "axios";

function RegisterForm() {
  const [res, setRes] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post(`${PUBLIC_API_URL}/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRes({ message: res.data.message });
      window.location.href = "/login"; // Redirigir al login después del registro exitoso
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setRes({ message: "Error al enviar el formulario" });
      return;
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
          placeholder="name"
          required
          autoComplete="off"
          id="name"
          name="name"
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
          Registrarse
        </button>
      </form>
      <div className="flex justify-center items-center gap-4 mt-4 bg-white rounded-lg shadow-lg p-4 w-[500px]">
        <button
          className="w-auto bg-amber-400 p-4 rounded-full text-black uppercase font-bold cursor-pointer"
          onClick={() => (window.location.href = "/login")}
        >
          Inicia Sesión
        </button>
      </div>
      <p>{res == null ? "" : res.message}</p>
    </>
  );
}

export default RegisterForm;
