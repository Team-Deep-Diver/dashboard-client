import { Wrapper } from "./style";
import { useNavigate, useParams } from "react-router-dom";

function MessageModal({message}) {
  const navigate = useNavigate();
  const { user_id } = useParams();

  return (
    <Wrapper>
      <div className="message">{message}</div>
      <input
        type="submit"
        value="닫기"
        className="close-button"
        onClick={() => navigate(`/users/${user_id}`)}
      />
    </Wrapper>
  );
}

export default MessageModal;
