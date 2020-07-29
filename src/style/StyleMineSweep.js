import styled from 'styled-components'

export const StyleMineSweep = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    ${'' /* transform: translate(-50% -50%); */}
    transform: translateX(-50%) translateY(-50%);
    ${'' /* transform: ; */}
    ${'' /* display: flex; */}
`
export const StyleMenu = styled.div`
    height: 60px;
    width: 100%;
    font-family: Pixel;
    ${'' /* display: flex; */}
    ${'' /* span{
        position: relative;
        left: 30px;
    } */}
`
export const StyleChildMenu = styled.span`
    margin-left: 100px;
    span{
        margin-left: 15px;
        font-size: 22px;
        position: relative;
        top: 5px;
    }
`