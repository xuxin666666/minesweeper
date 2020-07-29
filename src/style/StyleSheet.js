import styled from 'styled-components'

export const StyleSheet = styled.div`
    position: absolute;
    width: 800px;
    height: 500px;
    border-radius: 30px;
    background: url(/image/dialog_statistics_bg.png) cyan;
    background-size: cover;
    ${'' /* overflow: hidden; */}
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: none;
    z-index: 2;
    span{
        font-size: 25px;
    }
` 

export const StyleCover = styled.div`
    position: fixed;
    display: none;
    background: #000;
    opacity: 0.3;
    z-index: 1;
`