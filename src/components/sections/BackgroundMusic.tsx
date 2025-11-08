import {
  useState,
  useEffect
} from 'react';
import {
  Volume2,
  VolumeX,
  Music
} from 'lucide-react';
import {
  motion,
  AnimatePresence
} from 'motion/react';
import { Button } from '../ui/button';

interface BackgroundMusicProps {
  youtubeId: string
  autoPlay?: boolean
  initialVolume?: number
}

export function BackgroundMusic({
  youtubeId,
  autoPlay = true,
  initialVolume = 0.3,
}: BackgroundMusicProps) {
  const [player, setPlayer] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [volume, setVolume] = useState(initialVolume)

  /* Load YouTube IFrame API */
  useEffect(() => {
    if ((window as any).YT) return

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)
  }, [])

  /* Initialize player after API is ready */
  useEffect(() => {
    (window as any).onYouTubeIframeAPIReady = () => {
      const ytPlayer = new (window as any).YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: youtubeId,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          controls: 0,
          loop: 1,
          playlist: youtubeId,
          modestbranding: 1,
          origin: window.location.origin,
          mute: 0
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target)
            event.target.setVolume(initialVolume * 100)
            if (autoPlay) {
              event.target.playVideo()
              setIsPlaying(true)
            }
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === 1)
          },
        },
      })
    }
  }, [youtubeId, autoPlay, initialVolume])

  const togglePlay = () => {
    if (!player) return
    const state = player.getPlayerState()
    if (state === 1) player.pauseVideo()
    else player.playVideo()
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!player) return
    if (isMuted) {
      player.unMute()
    } else {
      player.mute()
    }
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (player && !isMuted) player.setVolume(newVolume * 100)
  }

  // Optional: handle user interaction for autoplay in browsers
  useEffect(() => {
    const handleUserInteraction = () => {
      if (player && autoPlay && !isPlaying) {
        player.playVideo()
        setIsPlaying(true)
      }
    }

    document.addEventListener('click', handleUserInteraction, { once: true, passive: true })
    document.addEventListener('keydown', handleUserInteraction, { once: true, passive: true })
    document.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true })

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [player, autoPlay, isPlaying])

  return (
    <div className="fixed bottom-[60px] right-4 z-40">
      {/* Hidden YouTube iframe */}
      <div id="yt-player"></div>

      {/* Music Control Button */}
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full w-12 h-12 p-0 shadow-lg bg-white/90 hover:bg-white border-2 border-primary/20"
          onClick={() => setShowControls(!showControls)}
          title={isPlaying ? "Music is playing" : "Music is paused"}
        >
          <div className="relative">
            <Music className="w-5 h-5 text-primary" />
            {isPlaying && (
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
        </Button>

        {/* Expanded Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[-195px] right-0 bg-white rounded-lg shadow-xl border p-4 min-w-[200px]"
            >
              <div className="space-y-3">
                {/* Play/Pause and Mute */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePlay}
                    className="flex-1"
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="w-10 h-8 p-0"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Volume Slider */}
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-center text-muted-foreground">
                    {Math.round(volume * 100)}%
                  </div>
                </div>

                {/* Status */}
                <div className="text-xs text-center text-muted-foreground border-t pt-2">
                  {isPlaying ? 'Playing background music' : 'Music paused'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}