import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface ReproductorVideoProps {
  videoUrl: string;
  thumbnail: string;
}

export default function ReproductorVideo({ videoUrl, thumbnail }: ReproductorVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implementar lógica de reproducción real
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // TODO: Implementar lógica de mute real
  };

  return (
    <div className="relative group">
      {/* Thumbnail / Video placeholder */}
      <div className="relative w-full aspect-video bg-[#2A2A3A] rounded-xl overflow-hidden">
        <img 
          src={thumbnail} 
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay con controles */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Play/Pause central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 ease-out hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-[#0F172A]" />
              ) : (
                <Play className="w-8 h-8 text-[#0F172A] ml-1" />
              )}
            </button>
          </div>

          {/* Controles inferiores */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-[#6366F1] transition-colors duration-200 ease-out"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>

              {/* Barra de progreso */}
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#6366F1] w-1/3"></div>
              </div>

              <button
                onClick={handleMuteToggle}
                className="text-white hover:text-[#6366F1] transition-colors duration-200 ease-out"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              <button className="text-white hover:text-[#6366F1] transition-colors duration-200 ease-out">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Información del video */}
      <div className="mt-3 flex items-center justify-between text-sm text-[#94A3B8]">
        <span>📹 Vídeo de técnica y ejecución</span>
        <span>2:45</span>
      </div>
    </div>
  );
}

