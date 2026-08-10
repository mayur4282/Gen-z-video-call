import React, { useEffect, useRef, useState} from 'react'
import io from "socket.io-client";

import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from "../styles/VideoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close'
import server from '../environment';


const server_url = server ;

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }, //stunserver = public ip
         { "urls": "stun:stun1.l.google.com:19302" },
          { "urls": "stun:stun2.l.google.com:19302" },
           { "urls": "stun:stun3.l.google.com:19302" },
            { "urls": "stun:stun4.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {
   
 var socketRef = useRef();
 let socketIdRef = useRef();

let localVideoRef = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);


     let [audioAvailable, setAudioAvailable] = useState(true);

     let [video, setVideo] = useState([]);

      let [audio, setAudio] = useState();

      let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(true);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(0);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");
 
    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    const chatScrollRef = useRef(null);

    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
    }, [messages, showModal]);

    useEffect(() => {
        console.log("HELLO")
        getPermissions();

    }, [])

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

  const getPermissions = async () =>{
    try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({video: true});
            if(videoPermission) {
              setVideoAvailable(true);

            }else{
              setVideoAvailable(false);
            }
        const audioPermission = await navigator.mediaDevices.getUserMedia({audio: true});
            if(audioPermission) {
              setAudioAvailable(true);

            }else{
              setAudioAvailable(false);
            }

            if(navigator.mediaDevices.getDisplayMedia) {
              setScreenAvailable(true);
            }else {
              setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {

              const userMediaStream = await navigator.mediaDevices.getUserMedia({video: videoAvailable , audio: audioAvailable});
              
              if(userMediaStream){
                window.localStream = userMediaStream;
                if(localVideoRef.current){
                  localVideoRef.current.srcObject = userMediaStream;

                }
              }
            }

    }catch (err){  
      console.log(err);

    }
  }

     useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);

        }


    }, [video, audio])
  
        let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
         connectToSocketServer();

    }
 


     let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoRef.current.srcObject = stream;

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                console.log(description)
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence();
            localVideoRef.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }


     let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }

    let getDislayMediaSuccess = (stream)=>{    console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoRef.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue;

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false);

            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoRef.current.srcObject = window.localStream

            getUserMedia()

        })

    }

       let gotMessageFromServer = (fromId, message) =>{
        var signal = JSON.parse(message)
         if (fromId !== socketIdRef.current){
          if (signal.sdp){
             connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(()=>{
               if (signal.sdp.type === 'offer'){

                  connections[fromId].createAnswer().then((description)=>{
                     connections[fromId].setLocalDescription(description).then(()=>{
                      socketRef.current.emit('signal', fromId, JSON.stringify({'sdp': connections[fromId].localDescription}))

                     }).catch(e => console.log(e))
                  }).catch(e => console.log(e))
               }
             }).catch(e => console.log(e))
          }
           if (signal.ice){
            connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            
           }
         }


    }


     let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })
          
        socketRef.current.on('signal', gotMessageFromServer)

         socketRef.current.on('connect', () => {
            console.log("Mera socket connect ho gya , my id is:", socketRef.current.id);

            socketRef.current.emit('join-call', window.location.href)
           
            socketIdRef.current = socketRef.current.id

              socketRef.current.on('chat-message', addMessage)

            socketRef.current.on('user-left', (id) => {
              if (connections[id]) {
                  connections[id].close();
                  delete connections[id];
              }
              setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })
          socketRef.current.on('user-joined', (id, clients) => {
            clients.forEach((socketListId)=>{

                if (socketListId === socketIdRef.current) return;

                if (connections[socketListId]) {
                    connections[socketListId].close();
                    delete connections[socketListId];
                }

               connections[socketListId] = new RTCPeerConnection(peerConfigConnections)

                connections[socketListId].onicecandidate =  (event) =>{
                   if (event.candidate != null) {
                    socketRef.current.emit("signal", socketListId, JSON.stringify({'ice': event.candidate}))
                   }

                }

                  connections[socketListId].onaddstream = (event) => {
                          console.log("BEFORE:", videoRef.current);
                        console.log("FINDING ID: ", socketListId);

                         let videoExists = videoRef.current.find(video => video.socketId === socketListId);
                         
                         if(videoExists){
                          setVideos(prevVideos=>{
                            const updatedVideos = prevVideos.map(video=>
                              video.socketId === socketListId ? {...video, stream: event.stream} : video 
                            ); 
                              videoRef.current = updatedVideos;
                                return updatedVideos;
                          });
                         } else{
                               
                            let newVideo ={
                              socketId: socketListId ,
                              stream:  event.stream,
                                autoplay: true,
                                playsinline: true
                            };
                      setVideos(prevVideos => {
                                const filtered = prevVideos.filter(v => v.socketId !== socketListId);
                                const updatedVideos = [...filtered, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                            
                         }
                  };

                if (window.localStream !== undefined && window.localStream !== null) {
                     connections[socketListId].addStream(window.localStream);
                    
                } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
               })
                      if (id === socketIdRef.current) {
                        for (let id2 in connections){
                          if (id2 === socketIdRef.current) continue

                          try{
                              connections[id2].addStream(window.localStream)
                          }catch (e) { }

                           connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                            .then(()=> { 
                                socketRef.current.emit( 'signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription  })  )
                            })
                            .catch(e => console.log(e))


                           })
                        }
 

                      }

          })

          })
         }

      let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }
       
     let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

  


  

    
   
    //todo
 


        let handleEndCall = () => {
        try {
            let tracks = localVideoRef.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        } catch (e) { }
        window.location.href = "/home"
    }
  
     let openChat = () => {
        setModal(true);
        setNewMessages(0);
    }
    let closeChat = () => {
        setModal(false);
    }
    let handleMessage = (e) => {
        setMessage(e.target.value);
    }

  //todo
    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };

    

  
    
     let sendMessage = () => {
        console.log(socketRef.current);
        socketRef.current.emit('chat-message', message, username)
        setMessage("");

        // this.setState({ message: "", sender: username })
    }

   let connect = () => {
        setAskForUsername(false);
        getMedia();
    }

      let handleVideo = () => {
        setVideo(!video);
        // getUserMedia();
    }
    let handleAudio = () => {
        setAudio(!audio)
        // getUserMedia();
    }

    
      
     useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen])

     let handleScreen = () => {
        setScreen(!screen);
    }


  return (
    <div>
          
        {askForUsername === true ? 
        <div style={{ display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', background: 'linear-gradient(135deg, #0B0D17 0%, #131627 40%, #1A1E35 100%)', padding: '2rem' }}>
          <h2 style={{ color: '#EAEDF3', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1.6rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>Enter the Lobby</h2>
          <p style={{ color: '#8B8FA3', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', marginBottom: '24px' }}>Preview your camera and join the meeting</p>
          <div style={{ display:'flex', gap:'12px', marginBottom:'24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" 
            sx={{
              minWidth: '0px',
              flex: '1 1 180px',
              maxWidth: '280px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderRadius: '10px',
                color: '#EAEDF3',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
                '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.4)' },
                '&.Mui-focused fieldset': { borderColor: '#6C63FF', boxShadow: '0 0 0 3px rgba(108,99,255,0.15)' },
              },
              '& .MuiInputLabel-root': { color: '#8B8FA3' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#A78BFA' },
            }}
          />
              <Button variant="contained" onClick={connect}
                sx={{
                  background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '10px 28px',
                  boxShadow: '0 4px 16px rgba(108,99,255,0.3)',
                  fontFamily: "'Inter', sans-serif",
                  '&:hover': { background: 'linear-gradient(135deg, #5A52E0 0%, #9171F0 100%)', transform: 'translateY(-2px)', boxShadow: '0 6px 24px rgba(108,99,255,0.45)' },
                }}
              >Connect</Button>
              </div>

              <div style={{width:'100%', maxWidth:'600px', borderRadius:'16px', overflow:'hidden', boxShadow:'0 12px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', backgroundColor:'#0B0D17'
              }}>
                <video ref={localVideoRef} autoPlay muted style={{width:'100%', display:'block'}} ></video>

              </div>



           </div> :
           
                      <div className={`${styles.meetVideoContainer} ${showModal ? styles.chatOpen : ''}`}>

                    {showModal ? <div className={styles.chatRoom}>

                        <div className={styles.chatContainer} style={{ display:'flex', flexDirection:'column', padding:'0' }}>
                            <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <h3 style={{ margin: 0, color: '#EAEDF3', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem' }}>Chat</h3>
                              <IconButton onClick={closeChat} size="small" sx={{ color: '#8B8FA3', '&:hover': { color: '#EAEDF3', backgroundColor: 'rgba(255,255,255,0.08)' } }}>
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </div>

                            <div ref={chatScrollRef} className={styles.chattingDisplay} style={{ flexGrow: 1, width:'100%', overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', alignItems:'flex-start', backgroundColor:'transparent', gap: '8px' }}>

                                {messages.length !== 0 ? messages.map((item, index) => {

                                    return (
                                        <div style={{ textAlign:'left', width:'100%', padding:'10px 14px', borderRadius:'10px', backgroundColor:'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)'}} key={index}>
                                            <p style={{ fontWeight: 600, fontSize:'0.8rem', marginBottom:'4px', color: '#A78BFA', fontFamily: "'Inter', sans-serif" }}>{item.sender}</p>
                                            <p style={{ margin:'0', color:'#EAEDF3', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif", wordBreak: 'break-word' }}>{item.data}</p>
                                        </div>
                                    )
                                }) :  <p style={{color:'#8B8FA3', alignSelf:'center', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', marginTop: '40px'}}>No messages yet</p>}


                            </div>

                            <div className={styles.chattingArea} style={{display:'flex', gap:'8px', padding:'12px'}}>
                                <TextField 
                                  value={message} 
                                  onChange={(e) => setMessage(e.target.value)} 
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      sendMessage();
                                    }
                                  }}
                                  id="outlined-basic" 
                                  label="Type a message..." 
                                  variant="outlined" 
                                  size="small"
                                  sx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                      backgroundColor: 'rgba(255,255,255,0.03)',
                                      borderRadius: '10px',
                                      color: '#EAEDF3',
                                      fontSize: '0.9rem',
                                      '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
                                      '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.4)' },
                                      '&.Mui-focused fieldset': { borderColor: '#6C63FF' },
                                    },
                                    '& .MuiInputLabel-root': { color: '#8B8FA3', fontSize: '0.85rem' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: '#A78BFA' },
                                  }}
                                />
                                <Button variant='contained' onClick={sendMessage}
                                  sx={{
                                    background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
                                    borderRadius: '10px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    minWidth: '60px',
                                    fontSize: '0.85rem',
                                    boxShadow: '0 2px 8px rgba(108,99,255,0.3)',
                                    '&:hover': { background: 'linear-gradient(135deg, #5A52E0 0%, #9171F0 100%)' },
                                  }}
                                >Send</Button>
                            </div>


                        </div>
                    </div> : <></>}


                    <div className={styles.buttonContainers}>
                        <IconButton onClick={handleVideo} style={{ color: "white" }}>
                            {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>
                        <IconButton onClick={handleEndCall}>
                            <CallEndIcon  style={{ color: "red" }} />
                        </IconButton>
                        <IconButton onClick={handleAudio}  style={{ color: "white" }}>
                            {audio === true ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>

                        {screenAvailable === true ?
                            <IconButton onClick={handleScreen} style={{ color: "white" }}>
                                {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                            </IconButton> : <></>}

                        <Badge badgeContent={newMessages} max={999} color='orange'>
                            <IconButton onClick={() => setModal(!showModal)} style={{ color: "white" }}>
                                <ChatIcon />                        </IconButton>
                        </Badge>

                    </div>
                    



            <video className={styles.meetUserVideo} ref={localVideoRef} autoPlay muted playsInline></video>
            
            <div className={styles.conferenceView}> {videos.map((video)=>(
              <div  key={video.socketId} style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', borderRadius: '14px' }}>

                <video 

                 data-socket={video.socketId} 
                ref={ref => {
                  if(ref && video.stream){
                    ref.srcObject = video.stream;
                  }
                }}
                autoPlay playsInline
                > 

                 
                </video>
                <span style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    color: '#EAEDF3',
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    padding: '2px 10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    backdropFilter: 'blur(4px)',
                    pointerEvents: 'none'
                }}>{video.socketId}</span>
               
             </div>

             ))}
             
             
             </div>
             
    
           
           </div>
      
      }



    </div>
  )
}
