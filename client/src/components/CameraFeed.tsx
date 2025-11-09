import { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CameraFeedProps {
  isActive: boolean;
  onStreamReady?: (stream: MediaStream) => void;
  onError?: (error: Error) => void;
  detectionBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    confidence: number;
  };
}

export default function CameraFeed({ isActive, onStreamReady, onError, detectionBox }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isActive]);

  useEffect(() => {
    if (detectionBox && canvasRef.current && videoRef.current) {
      drawDetectionBox();
    }
  }, [detectionBox]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'environment' },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setError(null);
        onStreamReady?.(mediaStream);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access camera';
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const drawDetectionBox = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !detectionBox) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'hsl(142, 70%, 45%)';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.strokeRect(
      detectionBox.x,
      detectionBox.y,
      detectionBox.width,
      detectionBox.height
    );

    ctx.fillStyle = 'hsla(142, 70%, 45%, 0.9)';
    ctx.fillRect(detectionBox.x, detectionBox.y - 30, 200, 30);
    ctx.fillStyle = 'white';
    ctx.font = '600 14px Inter';
    ctx.fillText(
      `${detectionBox.label} (${Math.round(detectionBox.confidence)}%)`,
      detectionBox.x + 10,
      detectionBox.y - 10
    );
  };

  if (error) {
    return (
      <Card className="aspect-video flex flex-col items-center justify-center gap-4 p-8 bg-card border-2">
        <CameraOff className="w-16 h-16 text-muted-foreground" />
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2">Camera Access Denied</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {error}. Please enable camera permissions in your browser settings and refresh the page.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full">
      <Card className="overflow-hidden border-2 bg-black">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            data-testid="video-camera-feed"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            data-testid="canvas-detection-overlay"
          />
          {!isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-card">
              <Camera className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
