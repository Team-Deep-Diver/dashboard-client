import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import { Wrapper, LoginForm } from "./style";
import { validateEmail } from "../../utils";

function Login() {
  const navigate = useNavigate();
  const [loginValues, setLoginValues] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { email, password } = loginValues;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setMessage(validateEmail(value) ? "" : "* 이메일 형식에 맞지 않습니다.");
    }

    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const handleHistory = (e) => {
    navigate(-1);
  };

  const login = async (e) => {
    e.preventDefault();
    console.log("로그인 눌림?");

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

    console.log("res :", res);

    if (res.status === 200) {
      const result = await res.json();
      const token = result.token.split(" ")[1];

      console.log("result", result);
      console.log("token", token);

      if (result.token) {
        navigate(`/users/${result.user._id}`);
      }
    } else {
      setMessage(res.message);
    }
  };

  useEffect(() => {
    if (validateEmail(email) && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <Wrapper>
      <header>
        <FontAwesomeIcon icon={faArrowLeftLong} onClick={handleHistory} />
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
          disabled={disabled}
          onClick={login}
        />
      </LoginForm>
    </Wrapper>
  );
}

export default Login;
