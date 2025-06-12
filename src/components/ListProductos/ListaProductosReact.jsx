import { useState, useRef, useEffect } from "react";
import { PUBLIC_API_URL } from "astro:env/client";
import styles from "./listaproductos.module.css";

function ListaProductosReact({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoverPos, setHoverPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const containerRef = useRef(null);
  const hideTimeout = useRef(null);

  const handleMouseEnter = (image, event) => {
    clearTimeout(hideTimeout.current);

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setSelectedProduct(image);
    setHoverPos({
      top: rect.top - containerRect.top,
      left: rect.left - containerRect.left,
      width: rect.width,
      height: rect.height,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setHoverPos((prev) => ({ ...prev, visible: false }));
      setSelectedProduct(null);
    }, 300);
  };

  return (
    <section ref={containerRef} className="flex relative overflow-hidden">
      <div className="w-[calc(1/2*100vw)] flex flex-wrap gap-6 items-center justify-center relative z-10 pt-20">
        {products.map((product) => (
          <a href={`/Tienda/producto/${product.id}`} key={product.id}>
            <article
              data-img={product.images[0].image}
              className={styles.productCard}
              onMouseEnter={(e) => handleMouseEnter(product.images[0].image, e)}
              onMouseLeave={handleMouseLeave}
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

        {/* 🔻 Hover SVG animado con fade 🔻 */}
        <div
          className={`${styles.svgOverlay} ${
            hoverPos.visible ? styles.visible : styles.hidden
          }`}
          style={{
            top: `${hoverPos.top}px`,
            left: `${hoverPos.left}px`,
            width: `${hoverPos.width}px`,
            height: `${hoverPos.height}px`,
          }}
        />
      </div>

      <div className="w-1/2 fixed right-0 top-0 h-screen z-0">
        <div
          className={`${styles.gradient} absolute inset-0 pointer-events-none`}
        />
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
