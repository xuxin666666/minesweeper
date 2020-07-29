import React, { useEffect, useRef } from 'react'
import { StyleMenu, StyleChildMenu } from '../style/StyleMineSweep'
import { Slider } from 'antd'
import {handleTime} from '../init'
import '../style/Menu.css'

const Menu = ({ time, flagNumber, changeSound, isRestart, setSheet }) => {
    const sound = useRef(null)
    const imgSound = useRef(null)
    const slider = useRef(null)

    useEffect(() => {
        var s = setInterval(() => {
            changeSound(slider.current.state.value)
        }, 500)
        return () => {
            clearInterval(s)
        }
    })
    useEffect(() => {   
        imgSound.current.onmouseover = () => {
            sound.current.style.display = 'block'
            imgSound.current.onmouseout = () => {
                sound.current.style.display = 'none'
            }
        }
        sound.current.onmouseover = () => {
            sound.current.style.display = 'block'
            sound.current.onmouseout = () => {
                sound.current.style.display = 'none'
            }
        }
    }, [])

    const restart = () => {
        let audio = new Audio('audio/click.mp3')
        audio.volume = slider.current.state.value / 100 * 0.6
        audio.play()
        
        isRestart(true)
    }

    const sheet = () => {
        let audio = new Audio('audio/click.mp3')
        audio.volume = slider.current.state.value / 100 * 0.6
        audio.play()
        setSheet(true)
    }

    return (
        <StyleMenu>
            <StyleChildMenu>
                <img src='image/time.png' alt='时间' width='45px' height='45px' />
                <span>{handleTime(time)}</span>
            </StyleChildMenu>
            <StyleChildMenu>
                <img src='image/mine.png' width='45px' height='45px' alt='地雷' />
                <span id='span2'>{flagNumber}</span>
            </StyleChildMenu>
            <StyleChildMenu>
                <img src='image/restart.png' alt='重新开始游戏' id='img2' onClick={restart} />
            </StyleChildMenu>
            <StyleChildMenu>
                <img src='image/sheet.png' alt='分数排名' id='img3' onClick={sheet} />
            </StyleChildMenu>
            <StyleChildMenu>
                <span id='span1'>
                    <img ref={imgSound} src='image/sound.png' alt='声音' id='img1' />
                    <div style={{display: 'none'}}  ref={sound}>
                        <Slider ref={slider} defaultValue={100} disabled={false} className="slider" />
                    </div>
                </span>
            </StyleChildMenu>
            
        </StyleMenu>
    )
}

export default Menu