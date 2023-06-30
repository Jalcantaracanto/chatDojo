import React from 'react'
import { useMeeting } from '@videosdk.live/react-sdk'

function Controls() {
    const { hlsState, startHls, stopHls } = useMeeting()
    const _handleHLS = () => {
        console.log('hlsState', hlsState)
        if (!hlsState || hlsState === 'HLS_STOPPED') {
            startHls({
                layout: {
                    type: 'SPOTLIGHT',
                    priority: 'PIN',
                    gridSize: 4,
                },
                theme: 'DARK',
                orientation: 'landscape',
            })
        } else if (hlsState === 'HLS_STARTED' || hlsState === 'HLS_PLAYABLE') {
            stopHls()
        }
    }
    return (
        <>
            {hlsState === 'HLS_STARTED' || hlsState === 'HLS_STOPPING' || hlsState === 'HLS_STARTING' || hlsState === 'HLS_PLAYABLE' ? (
                <button
                    onClick={() => {
                        _handleHLS()
                    }}
                    style={{
                        backgroundColor: '#FF5D5D',
                    }}
                >
                    {hlsState === 'HLS_STARTED' ? 'Live Starting' : hlsState === 'HLS_STOPPING' ? 'Live Stopping' : hlsState === 'HLS_PLAYABLE' ? 'Stop Live' : 'Loading...'}
                </button>
            ) : (
                <button
                    onClick={() => {
                        _handleHLS()
                    }}
                    style={{
                        backgroundColor: '#FF5D5D',
                    }}
                >
                    Go Live
                </button>
            )}
        </>
    )
}

export default Controls
