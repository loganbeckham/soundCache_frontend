import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import WaveSurfer from 'wavesurfer.js'
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa'
import styled from 'styled-components'



const Waveform = ({ audio }) => {
    const containerRef = useRef()
    const waveSurferRef = useRef({
        isPlaying: () => false,
    })

    const [isPlaying, toggleIsPlaying] = useState(false)

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
        container: containerRef.current,
        responsive: true,
        cursorWidth: 0,
        barWidth: 4,
        barHeight: .5,
        waveColor: 'pink',
        })
        waveSurfer.load(audio)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
        })

        return () => {
        waveSurfer.destroy()
        }
    }, [audio])

    return (
        <>
            <WaveSurferWrap>
                <button className='play-button' onClick={() => {
                    waveSurferRef.current.playPause()
                    toggleIsPlaying(waveSurferRef.current.isPlaying())
                    }} type="button"
                >
                    {isPlaying ? <FaPauseCircle size='1.5em' /> : <FaPlayCircle size='`1.5em'/>}
                </button>
                <div ref={containerRef} />
            </WaveSurferWrap>
        </>
    )
}

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
}

const WaveSurferWrap = styled.div`
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;

    button {
    width: 1.5em;
    border: none;
    background: tranparent;
    padding: 0;
    }
`


export default Waveform