import {useEffect, useRef} from 'react'

export const useInterval = (callback, delay) => {
    const saveCallBack = useRef()

    useEffect(() => {
        saveCallBack.current = callback
    })

    useEffect(() => {
        function tick(){
            saveCallBack.current()
        }
        if(delay !== null){
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}