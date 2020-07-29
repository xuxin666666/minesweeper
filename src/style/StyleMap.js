import styled from 'styled-components'

export const StyleMap = styled.div`
    display: grid;
    width: ${props => props.width * props.size}px;
    height: ${props => props.height * props.size}px;
    grid-template-rows: repeat(${props => props.height}, 1fr);
    grid-template-columns: repeat(${props => props.width}, 1fr);
    overflow: hidden;
`