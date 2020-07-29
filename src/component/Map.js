import React from 'react'
import {StyleMap} from '../style/StyleMap'
import Cell from './Cell'
import {size} from '../init'

const Map = ({stage}) => (
    <StyleMap width={stage[0].length} height={stage.length} size={size}>
        {stage.map((rows) => 
            rows.map((cell, y) => 
                <Cell key={y} isReversal={cell.isReversal} type={cell.number} flag={cell.flag} isDeeper={cell.deepColor}></Cell>
            )
        )}
    </StyleMap>
)

export default Map