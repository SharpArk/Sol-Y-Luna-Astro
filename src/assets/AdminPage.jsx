import axios from "axios";
import { useState } from "react";
import AdminForm from "../components/Admin/AdminForm";
import AdminInitial from "../components/Admin/AdminInitial";

function AdminPage({ name }) {
  const [active, setActive] = useState("init");
  const [show, setShow] = useState(true);

  const handleChange = (value) => {
    setShow(false);
    setTimeout(() => {
      setActive(value);
      setShow(true);
    }, 200);
  };

  return (
    <>
      <div className="w-1/6 bg-[#535576] h-[calc(100vh-16px)] rounded-r-2xl flex justify-start items-start flex-col gap-4 p-4 fixed top-2 left-2">
        <button
          className="bg-[#a70d3b] w-full p-4 rounded-2xl uppercase font-bold cursor-pointer"
          onClick={() => handleChange("init")}
        >
          Pagina inicial
        </button>
        <button
          className="bg-[#a70d3b] w-full p-4 rounded-2xl uppercase font-bold cursor-pointer"
          onClick={() => handleChange("addProduct")}
        >
          Añadir Producto
        </button>
      </div>
      <div className="absolute w-[calc((5/6*100vw)-38px)] right-2 top-2 h-fit p-5 bg-[#535576] rounded-2xl flex justify-center items-center">
        <div
          className={`transition-all duration-200 ${
            show
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          } w-full flex justify-center items-center`}
        >
          {active == "init" ? (
            <AdminInitial name={name} />
          ) : active == "addProduct" ? (
            <AdminForm />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
