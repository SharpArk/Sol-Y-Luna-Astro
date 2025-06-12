function Login({ Loged }) {
  return (
    <div>
      {Loged.condition ? (
        <a href={Loged.role == "admin" ? "/admin" : "/user"}>{Loged.name}</a>
      ) : (
        <a href="/login">Login</a>
      )}
    </div>
  );
}

export default Login;
