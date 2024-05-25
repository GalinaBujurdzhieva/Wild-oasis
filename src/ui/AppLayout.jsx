import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import styled from "styled-components"

const StyledMain = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow: scroll;
    `
const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
`

function AppLayout(){
return(
    <StyledAppLayout>
    <Header/>
    <Sidebar />
    <StyledMain>
    <Outlet />
    </StyledMain>
    </StyledAppLayout>
)
}
export default AppLayout