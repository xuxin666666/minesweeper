import React, { useState, useEffect, useRef, useCallback } from 'react'
import Map from './Map'
import { StyleMineSweep } from '../style/StyleMineSweep'
import { coordinate, init, preInit } from '../init'
import {setCookie} from '../addCookie'
import { Modal } from 'antd';
import Menu from './Menu'
import Sheet from './Sheet'

const MineSweep = () => {
    const [isFirst, setIsFirst] = useState(true)
    const [stage, setStage] = useState(preInit)
    const [flagNumber, setFlagNumber] = useState(99)
    const [time, setTime] = useState(0)
    const [X, setX] = useState(0)
    const [Y, setY] = useState(0)
    const [sound, setSound] = useState(1)
    const [canClick, setCanClick] = useState(true)
    const [canContextMenu, setCanContextMenu] = useState(true)
    const [isSheet, setIsSheet] = useState(false)

    const Main = useRef(null)
    const timer = useRef()
    const click = useRef()
    const contextmenu = useRef()


    const onClick = (e) => {
        if (canClick) {
            setCanClick(false)
            click.current = setTimeout(() => setCanClick(true), 300)
            var clickX = e.pageX - X, clickY = e.pageY - Y
            var cX = Math.floor(clickX / 36), cY = Math.floor(clickY / 36)
            if (stage[cY]) {
                if (stage[cY][cX]) {
                    if (isFirst) {
                        let sta = checkBlank(cY, cX, init(cY, cX))
                        let audio = new Audio('audio/sweep.mp3')
                        audio.volume = sound
                        audio.play()
                        setStage(sta)
                        setIsFirst(false)
                    } else {
                        if (!stage[cY][cX].flag) {
                            let sta = JSON.parse(JSON.stringify(stage))
                            if (sta[cY][cX].isReversal) {
                                let arr = []
                                let count = 0
                                for (let i = cY - 1; i <= cY + 1; i++) {
                                    for (let j = cX - 1; j <= cX + 1; j++) {
                                        if (checkCell(i, j, sta)) {
                                            if (sta[i][j].flag) count++
                                            else arr.push([i, j])
                                        }
                                    }
                                }
                                let sta1 = sta
                                if (count === sta[cY][cX].number) {
                                    arr.forEach((cell) => {
                                        sta1[cell[0]][cell[1]].isReversal = true
                                        sta1 = checkBlank(cell[0], cell[1], sta1)
                                    })
                                    sta = sta1
                                } else {
                                    arr.forEach((cell) => {
                                        sta1[cell[0]][cell[1]].deepColor = true
                                    })
                                    sta = sta1
                                    setTimeout(() => {
                                        arr.forEach((cell) => {
                                            sta1[cell[0]][cell[1]].deepColor = false
                                        })
                                        sta = sta1
                                    }, 0)
                                }
                                if (arr.length !== 0) {
                                    let audio = new Audio('audio/sweep.mp3')
                                    audio.volume = sound
                                    audio.play()
                                    setStage(sta)
                                }
                            } else {
                                sta[cY][cX].isReversal = true
                                let sta1 = checkBlank(cY, cX, sta)
                                let audio = new Audio('audio/sweep.mp3')
                                audio.volume = sound
                                audio.play()
                                setStage(sta1)
                            }
                        }
                    }
                }
            }
        }
    }

    const checkCell = (x, y, stage) => {
        if (0 <= x && x <= 15 && 0 <= y && y <= 29) {
            if (!stage[x][y].isReversal)
                return true
        }
        return false
    }

    const checkBlank = (x, y, stage) => {
        if (stage[x][y].number === ' ') {
            for (let i = x - 1; i <= x + 1; i++) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (i !== x || j !== y) {
                        if (checkCell(i, j, stage)) {
                            if (!stage[i][j].flag) {
                                stage[i][j].isReversal = true
                                stage = checkBlank(i, j, stage)
                            }
                        }
                    }
                }
            }
        }
        return stage
    }

    useEffect(() => {
        var locating = setInterval(() => {
            setX(coordinate(Main)[0])
            setY(coordinate(Main)[1])
        }, 500)
        return () => {
            clearInterval(locating)
        }
    })

    const onContextmenu = (e) => {
        if (canContextMenu) {
            setCanContextMenu(false)
            contextmenu.current = setTimeout(() => setCanContextMenu(true), 300)
            var clickX = e.pageX - X, clickY = e.pageY - Y
            var cX = Math.floor(clickX / 36), cY = Math.floor(clickY / 36)
            var sta = JSON.parse(JSON.stringify(stage))
            if (sta[cY]) {
                if (sta[cY][cX]) {
                    if (!sta[cY][cX].isReversal) {
                        sta[cY][cX].flag = !sta[cY][cX].flag
                        let audio = new Audio('audio/flag_mine.mp3')
                        audio.volume = sound
                        audio.play()
                        setStage(sta)
                    }
                }
            }
        }
        window.event.returnValue = false;
        return false
    }

    useEffect(() => {
        var num = 99, gameover = false, win = 0
        stage.forEach((row) => {
            row.forEach((cell) => {
                if (cell.number === '雷' && cell.isReversal) {
                    gameover = true
                }
                if (cell.flag) num--
                if (cell.number !== '雷' && cell.isReversal) win++
            })
        })
        setFlagNumber(num)
        if (gameover) {
            clearTimeout(click.current)
            clearTimeout(contextmenu.current)
            clearTimeout(timer.current)
            setCanContextMenu(false)
            setCanClick(false)
            let audio1 = new Audio('audio/bomb.mp3')
            audio1.volume = sound * 0.8
            audio1.play()
            audio1.addEventListener('ended', function () {
                let audio = new Audio('audio/gameover.mp3')
                audio.volume = sound * 0.5
                audio.play()
                Modal.error({
                    content: 'You Lost!',
                    onOk: () => {setCookie('F', time);isRestart(true);},
                    style: { top: 20 }
                })
            }, false)
        }
        if (win === 480 - 99) {
            clearTimeout(click.current)
            clearTimeout(contextmenu.current)
            clearTimeout(timer.current)
            setCanContextMenu(false)
            setCanClick(false)
            let audio = new Audio('audio/win.mp3')
            audio.volume = sound * 0.6
            audio.play()
            audio.addEventListener('ended', function () {
                Modal.success({
                    content: 'You Win!',
                    onOk: () => {setCookie('T', time);isRestart(true);},
                    style: { top: 20 }
                })
            }, false);
        }
    }, [stage, sound, time])

    const countDown = useCallback(() => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            if (!isFirst) {
                setTime(time + 1)
                countDown()
            }
        }, 1000)
    }, [isFirst, time])

    useEffect(() => {
        // var timeKeeping
        // timeKeeping = setTimeout(() => {
        //     if(!ref.current){
        //         setTime(time + 1)
        //         console.log(2)
        //     }
        // }, 1000)
        // if(!isFirst)
        countDown()
        return () => {
            clearTimeout(timer.current)
        }
    }, [countDown])

    const changeSound = (value) => {
        setSound(value / 100)
    }

    const isRestart = (value) => {
        if (value) {
            clearTimeout(timer.current)
            setStage(preInit)
            setIsFirst(true)
            setFlagNumber(99)
            setTime(0)
            setCanContextMenu(true)
            setCanClick(true)
        }
    }

    const setSheet = (value) => {
        setIsSheet(value)
    }



    return (
        <StyleMineSweep>
            <Menu time={time} flagNumber={flagNumber} changeSound={changeSound} isRestart={isRestart} setSheet={setSheet}></Menu>
            <div ref={Main} onClick={e => onClick(e)} onContextMenu={e => onContextmenu(e)}>
                <Map stage={stage}></Map>
            </div>
            <Sheet x={X} y={Y} issheet={isSheet} setSheet={setSheet} sound={sound}></Sheet>
        </StyleMineSweep>

    )
}

export default MineSweep
