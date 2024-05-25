import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";

// const LoginLayout = styled.main`
//   min-height: 100vh;
//   display: grid;
//   grid-template-columns: 48rem;
//   align-content: center;
//   justify-content: center;
//   gap: 3.2rem;
//   background-color: var(--color-grey-50);
// `;

const FullScreen = styled.main `
  height: 100vh;
  width: 100vw;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  justify-content: center;
`

function Login() {
  return <FullScreen>
    <Logo />
    <Heading as="h4">Log into your account</Heading>
    <LoginForm />
    </FullScreen>;
}

export default Login;
