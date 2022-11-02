import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  Wrapper,
  Header,
  Content,
  UserTypeWrapper,
  User,
  FontBackGround,
} from "./style";

export const MyComponent = () => (
  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
);

function Welcome() {
  const navigate = useNavigate();

  function goToSignUpPage() {
    navigate("/signup");
  }

  function goToGuestPage() {
    navigate("/guest");
  }

  function goToLoginPage() {
    navigate("/login");
  }

  return (
    <Wrapper>
      <Header>
        <button onClick={goToSignUpPage}>회원가입</button>
      </Header>
      <Content>
        <FontBackGround>
          <strong>Hello</strong>
        </FontBackGround>
        <UserTypeWrapper>
          <motion.div
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgba(255, 255, 255)",
              boxShadow: "0px 0px 8px rgba(255, 255, 255)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <User onClick={goToGuestPage}>Guest</User>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgba(255, 255, 255)",
              boxShadow: "0px 0px 8px rgba(255, 255, 255)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <User onClick={goToLoginPage}>Users</User>
          </motion.div>
        </UserTypeWrapper>
      </Content>
    </Wrapper>
  );
}

export default Welcome;
