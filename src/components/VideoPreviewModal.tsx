import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, X, Download, ChevronUp, RefreshCw } from 'lucide-react';

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  projectName: string;
  fileName: string;
}

export default function VideoPreviewModal({
  isOpen,
  onClose,
  videoSrc,
  projectName,
  fileName
}: VideoPreviewModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Format time (mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle auto-hiding controls
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSpeedMenu(false);
      }
    }, 2500);
  };

  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    }
    return () => {
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Video Event Handlers
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    handlePlayPause();
    resetControlsTimeout();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    resetControlsTimeout();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    resetControlsTimeout();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuteState = !isMuted;
    videoRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
    resetControlsTimeout();
  };

  const handleSpeedChange = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    resetControlsTimeout();
  };

  // Sync fullscreen state if changed natively (e.g. Escape key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!isOpen) return null;

  const speeds = [0.5, 1.0, 1.25, 1.5, 2.0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md select-none font-mono"
        onMouseMove={resetControlsTimeout}
      >
        {/* Top Gmail-like Navigation/Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-black/40 border-b border-white/10 z-10">
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm tracking-wider uppercase">
              {projectName}
            </span>
            <span className="text-gray-400 text-xs mt-0.5 font-mono">
              {fileName}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={videoSrc}
              download={fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 text-gray-300 hover:text-white rounded-full transition-colors duration-200 pointer-events-auto"
              title="Download video"
            >
              <Download size={20} />
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-primary/20 text-gray-300 hover:text-red-primary rounded-full transition-colors duration-200 pointer-events-auto"
              title="Close preview"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Media Container */}
        <div 
          ref={containerRef}
          className="flex-1 flex items-center justify-center relative group/player overflow-hidden bg-black"
        >
          {/* Main Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="max-h-[75vh] max-w-[90vw] aspect-video object-contain"
            playsInline
          />

          {/* Large Center Play/Pause Indicator (briefly shows on play/pause) */}
          <div 
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent"
          >
            {!isPlaying && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 bg-black/60 rounded-full border border-white/20 text-white shadow-2xl backdrop-blur-sm pointer-events-none"
              >
                <Play size={40} className="ml-1" />
              </motion.div>
            )}
          </div>

          {/* Dynamic styled overlay custom controls bar */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: showControls ? 0 : 100, opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/95 via-black/80 to-transparent px-4 sm:px-6 pb-4 sm:pb-6 pt-8 sm:pt-10 flex flex-col gap-3 sm:gap-4 z-10 pointer-events-auto"
          >
            {/* Timeline slider */}
            <div className="flex items-center gap-4 w-full">
              <span className="text-xs text-gray-400 min-w-[45px]">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-red-primary focus:outline-none hover:bg-white/30 transition-colors"
                style={{
                  background: `linear-gradient(to right, #CC0000 0%, #CC0000 ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <span className="text-xs text-gray-400 min-w-[45px]">
                {formatTime(duration)}
              </span>
            </div>

            {/* Bottom Actions and Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-5">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-red-primary transition-colors focus:outline-none cursor-pointer"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                {/* Volume Controls */}
                <div className="flex items-center gap-2 group/volume">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-red-primary transition-colors focus:outline-none cursor-pointer"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 md:w-0 md:group-hover/volume:w-20 transition-all duration-300 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-red-primary focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, #CC0000 0%, #CC0000 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Speed and Fullscreen Controls */}
              <div className="flex items-center gap-2 sm:gap-5 relative">
                {/* Speed Selection */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded text-xs transition-all duration-200 cursor-pointer"
                  >
                    <span>{playbackRate === 1 ? 'Normal' : `${playbackRate}x`}</span>
                    <ChevronUp size={14} className={`transition-transform duration-200 ${showSpeedMenu ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showSpeedMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute bottom-full mb-2 right-0 bg-[#0d0d0d] border border-white/10 rounded shadow-2xl py-1 min-w-[90px] flex flex-col z-20"
                      >
                        {speeds.map((speed) => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className={`px-4 py-2 text-left text-xs transition-colors duration-150 ${
                              playbackRate === speed
                                ? 'text-red-primary bg-red-primary/10 font-bold'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {speed === 1.0 ? '1.0x (Normal)' : `${speed}x`}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Restart Loop Button */}
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      if (!isPlaying) {
                        videoRef.current.play();
                        setIsPlaying(true);
                      }
                      resetControlsTimeout();
                    }
                  }}
                  className="text-white hover:text-red-primary transition-colors focus:outline-none cursor-pointer"
                  title="Replay"
                >
                  <RefreshCw size={18} />
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-red-primary transition-colors focus:outline-none cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
