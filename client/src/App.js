import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MeetingProvider, useMeeting, useParticipant, Constants } from '@videosdk.live/react-sdk'
import ReactPlayer from 'react-player'
import Hls from 'hls.js'
import ParticipantView from './components/ParticipantView'
import Controls from './components/Controls'

function SpeakerView() {
    const [joined, setJoined] = useState(null)
    //Get the method which will be used to join the meeting.
    //We will also get the participant list to display all participants
    const { participants } = useMeeting()
    const mMeeting = useMeeting({
        onMeetingJoined: () => {
            setJoined('JOINED')
            //we will pin the local participant if he joins in CONFERENCE mode
            if (mMeetingRef.current.localParticipant.mode == 'CONFERENCE') {
                mMeetingRef.current.localParticipant.pin()
            }
        },
    })
    //We will create a ref to meeting object so that when used inside the
    //Callback functions, meeting state is maintained
    const mMeetingRef = useRef(mMeeting)
    useEffect(() => {
        mMeetingRef.current = mMeeting
    }, [mMeeting])
    //Filtering the host/speakers from all the participants
    const speakers = useMemo(() => {
        const speakerParticipants = [...participants.values()].filter((participant) => {
            return participant.mode == Constants.modes.CONFERENCE
        })
        return speakerParticipants
    }, [participants])
    return (
        <div className="container">
            {joined && joined == 'JOINED' ? (
                <div>
                    {speakers.map((participant) => (
                        <ParticipantView participantId={participant.id} key={participant.id} />
                    ))}
                    <Controls />
                </div>
            ) : (
                <p>Joining the meeting...</p>
            )}
        </div>
    )
}

function ViewerView() {
    // States to store downstream url and current HLS state
    const playerRef = useRef(null)
    //Getting the hlsUrls
    const { hlsUrls, hlsState } = useMeeting()
    //Playing the HLS stream when the downstreamUrl is present and it is playable
    useEffect(() => {
        if (hlsUrls.downstreamUrl && hlsState == 'HLS_PLAYABLE') {
            if (Hls.isSupported()) {
                const hls = new Hls({
                    capLevelToPlayerSize: true,
                    maxLoadingDelay: 4,
                    minAutoBitrate: 0,
                    autoStartLoad: true,
                    defaultAudioCodec: 'mp4a.40.2',
                })
                let player = document.querySelector('#hlsPlayer')
                hls.loadSource(hlsUrls.downstreamUrl)
                hls.attachMedia(player)
            } else {
                if (typeof playerRef.current?.play === 'function') {
                    playerRef.current.src = hlsUrls.downstreamUrl
                    playerRef.current.play()
                }
            }
        }
    }, [hlsUrls, hlsState, playerRef.current])
    return (
        <div>
            {/* Showing message if HLS is not started or is stopped by HOST */}
            {hlsState != 'HLS_PLAYABLE' ? (
                <div>
                    <p>Please Click Go Live Button to start HLS</p>
                </div>
            ) : (
                hlsState == 'HLS_PLAYABLE' && (
                    <div>
                        <video
                            ref={playerRef}
                            id="hlsPlayer"
                            autoPlay={true}
                            controls
                            style={{ width: '50%', height: '50%' }}
                            playsinline
                            playsInline
                            muted={true}
                            playing
                            onError={(err) => {
                                console.log(err, 'hls video error')
                            }}
                        ></video>
                    </div>
                )
            )}
        </div>
    )
}

const App = () => {
    const [mode, setMode] = useState(null)

    return mode ? (
        <MeetingProvider
            config={{
                meetingId: 'b31j-nlua-wwag',
                micEnabled: true,
                webcamEnabled: true,
                name: "Javier's Org",
                mode,
            }}
            joinWithoutUserInteraction
            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1NzgwYzZkMS1iOTkxLTRkN2ItOWIwOC04ZGFjNjJlNDIwN2YiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4ODEzNjcyNywiZXhwIjoxNjg4MjIzMTI3fQ.r1ideqPVryMyyRVLVUPnHrxugMny1TcgXgUmstQS7sU"
        >
            {mode === Constants.modes.CONFERENCE ? <SpeakerView /> : <ViewerView />}
        </MeetingProvider>
    ) : (
        <div>
            <button
                onClick={() => {
                    setMode(Constants.modes.CONFERENCE)
                }}
            >
                Join as Speaker
            </button>
            <button
                style={{ marginLeft: 12 }}
                onClick={() => {
                    setMode(Constants.modes.VIEWER)
                }}
            >
                Join as Viewer
            </button>
        </div>
    )
}

export default App
