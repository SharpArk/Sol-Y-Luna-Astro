import { PUBLIC_API_URL } from "astro:env/client";
import axios from "axios";
import { useState } from "react";

function AdminForm() {
  const [Response, SetResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let sizesPrices = formData.get("sizes");
    sizesPrices = sizesPrices.split(",");

    const dataSizes = [];

    sizesPrices.forEach((e) => {
      const [size, price] = e.split(":");
      dataSizes.push({
        size: size.trim(),
        price: price.trim(),
      });
    });

    formData.delete("sizes");
    formData.append("sizes", JSON.stringify(dataSizes));

    const data = await axios.post(`${PUBLIC_API_URL}/store/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    SetResponse(data.data);
  };

  return (
    <>
      <form
        className="bg-gray-900 w-fit p-4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="w-full bg-gray-800 mb-3 p-5 text-gray-500 rounded-4xl uppercase">
          DATOS DEL PRODUCTO
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
          <label htmlFor="name">Descripción corta</label>
          <input
            className="border-2 border-white rounded-lg p-2"
            id="description_short"
            name="description_short"
            type="text"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Descripción larga</label>
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
            id="sizes"
            name="sizes"
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
            max={3}
          />
        </div>
        <button
          type="submit"
          className="border-4 cursor-pointer mt-6 border-white w-3xl h-12 rounded-full neon-effect bg-[#e91e63] text-white font-bold hover:bg-[#d01756] transition-all"
        >
          Enviar
        </button>
      </form>
      <div>
        {Response && (
          <div className="bg-gray-800 w-1/2 p-4 rounded-lg mt-4">
            <h3 className="w-full bg-gray-800 mb-3 p-5 text-gray-500 rounded-4xl uppercase">
              Respuesta
            </h3>
            <pre>{JSON.stringify(Response, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminForm;
