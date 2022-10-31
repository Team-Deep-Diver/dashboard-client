import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import { Wrapper, LoginForm } from "./style";
import { validateLoginForm } from "../../utils/validateLoginForm";

function Login() {
  const navigate = useNavigate();
  const [loginValues, setLoginValues] = useState("");
  const [message, setMessage] = useState("");
  const { email, password } = loginValues;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    const errors = validateLoginForm(loginValues);

    if (errors.length > 0) {
      return setMessage(errors[0].message);
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_REQUEST_HOST}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 400) {
        return setMessage(data.message);
      }

      const token = data.token.split(" ")[1];

      if (token) {
        localStorage.setItem("jwt", token);
        navigate(`/users/${data.user._id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <header>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          size="2x"
          onClick={() => navigate("/")}
        />
      </header>
      <LoginForm>
        <h1>로그인</h1>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="이메일"
          required
          value={email || ""}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          required
          value={password || ""}
          onChange={(e) => handleChange(e)}
        />
        <div className="validation-message">{message}</div>
        <input
          type="submit"
          value="로그인"
          className="login-button"
          onClick={login}
        />
      </LoginForm>
    </Wrapper>
  );
}

export default Login;
