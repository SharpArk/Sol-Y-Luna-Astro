function Login({ Loged }) {
  return (
    <>
      {Loged.condition ? (
        <a
          className="cursor-grab"
          href={Loged.role == "admin" ? "/admin" : "/user"}
        >
          {Loged.name}
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
