import { PUBLIC_API_URL } from "astro:env/client";
import styles from "./idReact.module.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function IdReact({ product, validate }) {
  const [sizeActive, setSizeActive] = useState(product.sizes[0]);
  const [visibleImageId, setVisibleImageId] = useState(null);
  const [message, setMessage] = useState(null);

  const imageRefs = useRef({});

  // Crear refs para cada imagen antes del primer render
  product.images.forEach((img) => {
    if (!imageRefs.current[img.id]) {
      imageRefs.current[img.id] = React.createRef();
    }
  });

  const scrollToImage = (id) => {
    const ref = imageRefs.current[id];
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idUser = validate.Loged.id;
    const idProduct = product.id;
    const quantity = 1;

    if (!validate.Loged.condition) {
      const newMessage = "Inicia sesión porfavor";
      setMessage(newMessage);
      alert(newMessage);
    } else {
      try {
        const response = await axios.post(`${PUBLIC_API_URL}/store/addCart`, {
          idUser,
          idProduct,
          quantity,
        });
        const newMessage = response.data.message;
        setMessage(newMessage);
        alert(newMessage);
      } catch (error) {
        const newMessage = "Error al añadir al carrito";
        setMessage(newMessage);
        alert(newMessage);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const id = visible.target.getAttribute("data-id");
          setVisibleImageId(id);
        }
      },
      {
        threshold: 0.6,
      }
    );

    product.images.forEach((img) => {
      const ref = imageRefs.current[img.id];
      if (ref?.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [product.images]);

  return (
    <article className="w-full min-h-screen flex justify-between items-center">
      <div className="w-1/3 flex flex-col justify-center items-center fixed top-0 left-0 h-screen gap-8">
        {product.images.map((img) => {
          const isActive = String(img.id) === String(visibleImageId);
          return (
            <img
              key={`thumb-${img.id}`}
              className={`w-1/3 h-[calc((1/3*100vh)-50px)] object-cover rounded-3xl cursor-pointer transition-all duration-300 ${
                isActive ? "grayscale-0 scale-110" : "grayscale mr-[calc(25%)]"
              }`}
              src={`${PUBLIC_API_URL}/${img.image}`}
              onClick={() => scrollToImage(img.id)}
            />
          );
        })}
      </div>

      {/* Imágenes centrales con refs */}
      <div className="w-1/3 flex flex-col items-center justify-center gap-4 mx-auto">
        {product.images.map((img) => (
          <img
            key={`main-${img.id}`}
            ref={imageRefs.current[img.id]}
            data-id={img.id}
            className="w-full h-screen object-cover"
            src={`${PUBLIC_API_URL}/${img.image}`}
          />
        ))}
      </div>

      {/* Panel derecho con detalles */}
      <div className="flex flex-col justify-center items-center gap-6 w-1/3 fixed top-0 right-0 h-screen">
        <h1 className={`text-4xl uppercase font-bold relative ${styles.title}`}>
          {product.name}
        </h1>
        <p>{product.description_short}</p>
        <p>{product.description_long}</p>
        <div className="flex gap-4 w-fit">
          {product.sizes.map((size, index) => (
            <p
              key={size.id ?? index}
              className="cursor-pointer"
              onMouseEnter={() => setSizeActive(size)}
              onMouseLeave={() => setSizeActive(product.sizes[0])}
            >
              {size.size}
            </p>
          ))}
        </div>
        <p className={`font-bold text-2xl relative ${styles.price}`}>
          {sizeActive.price}
        </p>
        <form onSubmit={handleSubmit}>
          <button className="text-2xl text-white bg-[#e91e63] uppercase p-5 font-bold rounded-full cursor-pointer border-3 border-[#e91e63] hover:bg-[#00000001] transition-all duration-300 ease-in-out">
            añadir al carrito
          </button>
        </form>
      </div>
    </article>
  );
}

export default IdReact;
