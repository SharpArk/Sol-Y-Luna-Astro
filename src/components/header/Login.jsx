function Login({ Loged }) {
  return (
    <>
      {Loged.condition ? (
        <a
          className="cursor-grab"
          href={Loged.role == "admin" ? "/admin" : "/user"}
        >
          <img
            className="aspect-square w-15 rounded-full"
            src={Loged.Image}
            alt=""
          />
        </a>
      ) : (
        <a className="cursor-grab" href="/login">
          Login
        </a>
      )}
    </>
  );
}

export default Login;
