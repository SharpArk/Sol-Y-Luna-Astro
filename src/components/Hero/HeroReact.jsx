import { PUBLIC_API_URL } from "astro:env/client";
import { useState } from "react";
import styles from "./hero.module.css";

function HeroReact({ data }) {
  const products = data;
  const [activeProduct, setActiveProduct] = useState(products[0].id);

  return (
    <section className="w-full h-screen flex items-center justify-center">
      {products.map((product) => (
        <div
          key={product.id}
          className={
            activeProduct === product.id
              ? "opacity-100 transition-opacity duration-500 ease-in-out"
              : "opacity-0 pointer-events-none"
          }
          data-active={product.id}
        >
          <div className="absolute left-0 top-0 pb-[250px] h-full w-1/2 flex flex-col justify-center items-center gap-4">
            <h1
              className={`text-5xl uppercase relative ${styles.title} h-fit w-fit`}
            >
              {product.name}
            </h1>
            <p className={`${styles.description} max-w-2xl text-lg`}>
              {product.description_short}
            </p>
            <span className="flex items-center gap-2">
              {product.sizes.map((size) => (
                <p key={size.id}>{size.size}</p>
              ))}
            </span>
            <p className={`text-2xl ${styles.price} relative`}>
              {product.sizes[0].price}
            </p>
          </div>
          <img
            className={`absolute right-0 top-0 h-full w-1/2 object-cover ${styles.img}`}
            src={`${PUBLIC_API_URL}/${product.images[0].image}`}
            alt=""
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 w-full flex justify-evenly items-center">
        {products.slice(1).map((product) => (
          <div
            className="w-1/4 flex gap-4 justify-center items-center rounded-lg bg-[#32347d60] backdrop-blur-2xl p-5 hover:bg-[#32347d80] transition-colors duration-300 cursor-pointer"
            key={product.id}
            onMouseEnter={() => setActiveProduct(product.id)}
            onMouseLeave={() => setActiveProduct(products[0].id)}
            onClick={() =>
              (window.location.href = `/Tienda/producto/${product.id}`)
            }
          >
            <h1>{product.name}</h1>
            <img
              className="aspect-square w-[250px] rounded-full object-cover"
              src={`${PUBLIC_API_URL}/${product.images[0].image}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroReact;
