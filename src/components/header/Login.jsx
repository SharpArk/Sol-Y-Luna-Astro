function Login({ Loged }) {
  return (
    <>
      {Loged.condition ? (
        <a href={Loged.role == "admin" ? "/admin" : "/user"}>{Loged.name}</a>
      ) : (
        <a href="/login">Login</a>
      )}
    </>
  );
}

export default Login;
