"use client";
import { API_URL } from "astro:env/server";

function AdminForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const description_short = e.target.description_short.value;
    const description_long = e.target.description_long.value;
    const size = e.target.size.value;
    const image = e.target.image.files;

    const res = await fetch(`${API_URL}/store/products`, {
      method: "POST",
      body: JSON.stringify({ name, description_short, description_long, size }),
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const data = res.json();
  };

  return (
    <>
      <form
        className="bg-gray-900 w-1/2 p-4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="w-full bg-gray-800 mb-3 p-5 text-gray-500 rounded-4xl uppercase">
          Datos del producto
        </h3>
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Nombre del producto</label>
          <input
            className="border-2 border-white rounded-lg p-2"
            id="name"
            name="name"
            type="text"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Nombre del producto</label>
          <input
            className="border-2 border-white rounded-lg p-2"
            id="description_short"
            name="description_short"
            type="text"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Nombre del producto</label>
          <textarea
            className="border-2 border-white rounded-lg p-2"
            id="description_long"
            name="description_long"
            type="text"
            autoComplete="off"
          />
        </div>
        <h3 className="w-full bg-gray-800 mb-3 p-5 text-gray-500 rounded-4xl uppercase">
          Tallas
        </h3>
        <div className="flex flex-col mb-4">
          <label htmlFor="size">
            Tallas (separadas por coma, dos puntos y en frente el precio)
          </label>
          <input
            className="border-2 border-white rounded-lg p-2"
            id="size"
            name="size"
            type="text"
            autoComplete="off"
          />
        </div>
        <h3 className="w-full bg-gray-800 mb-3 p-5 text-gray-500 rounded-4xl uppercase">
          IMAGENES
        </h3>
        <div className="flex flex-col mb-4">
          <label htmlFor="image">Imagenes</label>
          <input
            className="border-2 border-white rounded-lg p-2"
            id="images"
            name="images"
            multiple
            type="file"
            autoComplete="off"
          />
        </div>
        <button class="border-4 cursor-pointer mt-6 border-white w-3xl h-12 rounded-full neon-effect bg-[#e91e63] text-white font-bold hover:bg-[#d01756] transition-all">
          Enviar
        </button>
      </form>
    </>
  );
}

export default AdminForm;
