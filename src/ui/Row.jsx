import styled, { css } from "styled-components";

const Row = styled.div`
    display: flex;
    ${props => props.type === 'horizontal' && css`
       align-items:center;
       gap:2rem;
       justify-content: space-between;
    `}

    ${props => props.type === 'vertical' && css`
    flex-direction: column;
    gap: 1.5rem;
    `
    }
`
Row.defaultProps = {
    type: 'vertical'
}
export default Row;