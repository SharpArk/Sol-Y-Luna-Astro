import { PUBLIC_API_URL } from "astro:env/client";

function UserPage({ data }) {
  if (!data)
    return (
      <p className="text-center text-gray-500 mt-10">Cargando usuario...</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={data.image}
          alt={`Foto de ${data.name}`}
          className="w-16 h-16 rounded-full border"
        />
        <h1 className="text-2xl font-semibold">Usuario: {data.name}</h1>
      </div>

      <h2 className="text-xl font-bold mb-4 border-b pb-2">Carrito</h2>

      {!data.Cart || data.Cart.length === 0 ? (
        <p className="text-gray-500">No hay productos en el carrito.</p>
      ) : (
        <ul className="space-y-6">
          {data.Cart.map((item) => (
            <li
              key={item.id}
              className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-600">
                {item.product.description_short}
              </p>
              <p className="mt-2 font-medium">Cantidad: {item.quantity}</p>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Imágenes</h4>
                <div className="flex flex-wrap gap-3">
                  {item.product.images?.map((img, index) => (
                    <img
                      key={index}
                      src={`${PUBLIC_API_URL}/${img.image.replaceAll(
                        "\\",
                        "/"
                      )}`}
                      alt={`Producto imagen ${index + 1}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-1">Tamaños y precios</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {item.product.sizes?.map((sizeObj, index) => (
                    <li key={index}>
                      <span className="font-medium">{sizeObj.size}</span>: $
                      {sizeObj.price}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserPage;
