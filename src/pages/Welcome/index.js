import { useNavigate } from "react-router";

import { motion } from "framer-motion";

import {
  hover,
  tap,
  Wrapper,
  Header,
  Content,
  UserTypeWrapper,
  User,
  FontBackGround,
} from "./style";

function Welcome() {
  const navigate = useNavigate();

  const navigatePage = (e) => {
    e.target.textContent === "회원가입" && navigate("/signup");
    e.target.textContent === "Guest" && navigate("/guest");
    e.target.textContent === "Users" && navigate("/login");
  };

  return (
    <Wrapper>
      <Header>
        <button onClick={navigatePage}>회원가입</button>
      </Header>
      <Content>
        <FontBackGround>
          <strong>Hello</strong>
        </FontBackGround>
        <UserTypeWrapper>
          <motion.div whileHover={hover} whileTap={tap}>
            <User onClick={navigatePage}>Guest</User>
          </motion.div>
          <motion.div whileHover={hover} whileTap={tap}>
            <User onClick={navigatePage}>Users</User>
          </motion.div>
        </UserTypeWrapper>
      </Content>
    </Wrapper>
  );
}

export default Welcome;
