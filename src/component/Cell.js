import React from 'react'
import { StyledCellBg, StyledCellBg1, StyledCellBg2 } from '../style/StyleCellBg'

const Cell = ({ isReversal, type, flag, isDeeper }) => {
    return(
        <StyledCellBg>
            {!isReversal ? <StyledCellBg1 color={isDeeper ? '106, 131, 114' : '128, 143, 124'}>{flag ? <img src='image/flag.png' alt='旗' id="flag" /> : <div />}</StyledCellBg1>
                : <StyledCellBg2>{type === '雷' ? <img src='image/mine.png' alt={type} id='mine'/> : <span id='span'>{type}</span>}</StyledCellBg2>}
        </StyledCellBg>
    )
}

export default Cell

