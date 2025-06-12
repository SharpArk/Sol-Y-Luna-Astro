import { useState } from "react";
import { PUBLIC_API_URL } from "astro:env/client";
import styles from "./listaproductos.module.css";

function ListaProductosReact({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="flex">
      <div className="w-[calc(1/2*100vw)] flex flex-wrap gap-6 items-center justify-center">
        {products.map((product) => (
          <a href={`/Tienda/producto/${product.id}`} key={product.id}>
            <article
              data-img={product.images[0].image}
              className={`${styles.productCard} relative`}
              onMouseEnter={() => setSelectedProduct(product.images[0].image)}
              onMouseLeave={() => setSelectedProduct(null)}
            >
              <img
                className="w-[250px] h-[200px] object-cover rounded-t-3xl"
                src={`${PUBLIC_API_URL}/${product.images[0].image}`}
                alt={product.name}
              />
              <div className="text-black flex flex-col items-center justify-start p-4 gap-2">
                <p>{product.name}</p>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <p key={size.id}>{size.size}</p>
                  ))}
                </div>
                <p className="price relative text-[#32347d] font-bold">
                  ${product.sizes[0].price}
                </p>
              </div>
            </article>
          </a>
        ))}
      </div>

      <div className="w-1/2 fixed right-0 top-0 h-screen">
        <div
          className={`${styles.gradient} absolute inset-0 pointer-events-none`}
        ></div>

        {products.map((product) => (
          <img
            key={product.id}
            src={`${PUBLIC_API_URL}/${product.images[0].image}`}
            alt={product.name}
            className={`w-full h-full object-cover absolute transition-opacity duration-300 ${
              selectedProduct === product.images[0].image
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            } ${styles.hoverImage}`}
          />
        ))}
      </div>
    </section>
  );
}

export default ListaProductosReact;
