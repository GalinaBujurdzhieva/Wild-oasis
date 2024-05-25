import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenuBar = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenuBar() {
    const navigate = useNavigate();
  return (
    <StyledHeaderMenuBar>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
            <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenuBar>
  );
}
export default HeaderMenuBar;
