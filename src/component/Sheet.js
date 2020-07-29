import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, StyleCover } from '../style/StyleSheet'
import { handleTime } from '../init'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { getCookieValue, clearCookieValue } from '../addCookie'
import '../style/sheet.css'

const Sheet = ({ x, y, issheet, setSheet, sound }) => {
    const sheet = useRef()
    const mask = useRef()
    const cookie = () => {
        var name = 'minesweeper'
        var value = getCookieValue(name).split(',')
        var array = []
        if (value.length > 1)
            for (let i = 0; i < value.length; i += 3) {
                var childArray = []
                childArray[0] = value[i]
                childArray[1] = value[i + 1]
                childArray[2] = value[i + 2]
                if (childArray[1] !== undefined && childArray[2] !== undefined) array.push(childArray)
            }
        return array
    }

    const [cookieArray, setCookieArray] = useState(cookie())

    useEffect(() => {
        setCookieArray(cookie())
    }, [issheet])

    useEffect(() => {
        mask.current.style.width = document.documentElement.clientWidth + 'px'
        mask.current.style.height = document.documentElement.clientHeight + 'px'
        mask.current.style.left = -x + 'px'
        mask.current.style.top = -y + 60 + 'px'
    })

    useEffect(() => {
        if (issheet) {
            sheet.current.style.display = 'block'
            mask.current.style.display = 'block'
        }
    }, [issheet])

    const close = () => {
        let audio = new Audio('audio/click.mp3')
        audio.volume = sound * 0.6
        audio.play()
        setSheet(false)
        sheet.current.style.display = 'none'
        mask.current.style.display = 'none'
    }


    const handleCookieArray = () => {
        var array = [], victory = 0, all = 0, lv = 0
        cookieArray.forEach((cell) => {
            if (cell[0] === 'T') {
                array.push(cell)
                victory++
            }
            all++
        })
        if (array.length > 0) {
            var flag, middle, newArray = []
            for (let i = 0; i < array.length - 1; i++) {
                flag = 0
                for (let j = 0; j < array.length - i - 1; j++) {
                    if (array[j][1] > array[j + 1][1]) {
                        middle = array[j]
                        array[j] = array[j + 1]
                        array[j + 1] = middle
                        flag = 1
                    }
                }
                if (flag === 0) break
            }
            if (array.length < 5)
                for (let i = 0; i < array.length; i++) {
                    newArray[i] = array[i]
                }
            else
                for (let i = 0; i < 5; i++) {
                    newArray[i] = array[i]
                }
        } else {
            array = []
        }
        if (all > 0) {
            lv = victory / all
            lv = lv.toFixed(3)
        } else lv = 0
        lv = lv * 100 + '%'
        return [array, victory, all, lv]
    }

    const confirming = () => {
        let audio = new Audio('audio/click.mp3')
        audio.volume = sound * 0.6
        audio.play()
        var txt = "你确定要重置所有游戏记录吗？"
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: txt,
            onOk: isOk,
            onCancel: isCancel,
            okText: '确认',
            cancelText: '取消',
        });
    }

    const isOk = () => {
        let audio = new Audio('audio/click.mp3')
        audio.volume = sound * 0.6
        audio.play()
        var name = 'minesweeper'
        clearCookieValue(name)
        setCookieArray([])
    }

    const isCancel = () => {
        let audio = new Audio('audio/click.mp3')
        audio.volume = sound * 0.6
        audio.play()
    }


    return (
        <div>
            <StyleSheet ref={sheet}>
                <button id='btn1' onClick={close}>╳</button>
                <div id='sheetdiv1'>
                    <p id='sheetp'>最佳纪录</p>
                    {handleCookieArray()[0].map((cell, x) => <div key={x}>
                        <span className='sheetspan1'>{`${x + 1}.`}</span>
                        <span className='sheetspan2'>{handleTime(cell[1])}</span>
                        <span className='sheetspan3'>{cell[2]}</span>
                    </div>)}
                </div>
                <div id='sheetdiv2'>
                    <div>
                        <span>胜场数</span>
                        <span>{handleCookieArray()[1]}</span>
                    </div>
                    <div>
                        <span>总场数</span>
                        <span>{handleCookieArray()[2]}</span>
                    </div>
                    <div>
                        <span>胜率</span>
                        <span>{handleCookieArray()[3]}</span>
                    </div>
                </div>
                <button id='sheetbtn1' onClick={confirming}>重置</button>
                <button id='sheetbtn2' onClick={close}>关闭</button>
            </StyleSheet>
            <StyleCover ref={mask} />
        </div>
    )
}

export default Sheet