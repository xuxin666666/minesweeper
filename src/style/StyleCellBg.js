import styled from 'styled-components'

export const StyledCellBg = styled.div`
    border: 0.5px solid #555;
`
export const StyledCellBg1 = styled.div`
    width: 100%;
    height: 100%;
    border: 5px solid;
    box-sizing: border-box;
    margin: 0;
    cursor: pointer;
    overflow: hidden;
    background: rgba(${props => props.color}, 0.8);
    border-left-color: rgba(${props => props.color}, 0.3);
    border-right-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 0.3);
    border-bottom-color: rgba(${props => props.color}, 1);
    img{
        width: 24px;
        height: 24px;
        display: block;
    }
`

export const StyledCellBg2 = styled.div`
    width: 100%;
    height: 100%;
    border: 5px solid;
    ${'' /* padding-left: 7px; */}
    cursor: pointer;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 15px;
    ${'' /* padding-top: 2px; */}
    ${'' /* text-align: center; */}
    background: rgba(168, 216, 185, 0.8);
    border-left-color: rgba(168, 216, 185, 0.3);
    border-right-color: rgba(168, 216, 185, 1);
    border-top-color: rgba(168, 216, 185, 0.3);
    border-bottom-color: rgba(168, 216, 185, 1);
    -moz-user-select:none;
    -webkit-user-select:none;
    user-select:none;   
    img{
        width: 24px;
        height: 24px;
        display: block;
    }
    span{
        margin-left: 7px;
        margin-top: 2px
    }
`