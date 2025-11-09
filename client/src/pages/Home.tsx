import { useState, useRef } from 'react';
import CameraFeed from '@/components/CameraFeed';
import DetectionResults from '@/components/DetectionResults';
import RecyclingInfo from '@/components/RecyclingInfo';
import ControlPanel from '@/components/ControlPanel';
import StatsDisplay from '@/components/StatsDisplay';
import ThemeToggle from '@/components/ThemeToggle';
import { Recycle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ResinCode } from '@shared/schema';

export default function Home() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedResinCode, setDetectedResinCode] = useState<ResinCode | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [detectionBox, setDetectionBox] = useState<any>(null);
  
  const [totalDetections, setTotalDetections] = useState(0);
  const [avgConfidence, setAvgConfidence] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { toast } = useToast();

  const handleStartDetection = () => {
    setIsDetecting(true);
    console.log('Camera detection started');
  };

  const handleStopDetection = () => {
    setIsDetecting(false);
    setDetectionBox(null);
    console.log('Camera detection stopped');
  };

  const captureFrame = (): string | null => {
    const video = document.querySelector('video');
    if (!video) return null;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const handleCapture = async () => {
    if (!isDetecting) {
      toast({
        title: "Camera not active",
        description: "Please start the camera first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    const startTime = performance.now();
    
    try {
      const imageData = captureFrame();
      if (!imageData) {
        throw new Error('Failed to capture frame');
      }

      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error('Classification failed');
      }

      const data = await response.json();

      if (data.plasticDetected && data.resinCode) {
        setDetectedResinCode(data.resinCode as ResinCode);
        setConfidence(Math.round(data.confidence));
        
        setDetectionBox({
          x: 200,
          y: 150,
          width: 300,
          height: 250,
          label: `Resin #${data.resinCode}`,
          confidence: Math.round(data.confidence),
        });

        setTotalDetections(prev => prev + 1);
        setAvgConfidence(prev => {
          const newTotal = totalDetections + 1;
          return Math.round(((prev * totalDetections) + data.confidence) / newTotal);
        });

        toast({
          title: "Plastic detected!",
          description: data.reasoning,
        });
      } else {
        setDetectedResinCode(null);
        setConfidence(0);
        setDetectionBox(null);
        
        toast({
          title: "No plastic detected",
          description: "Please point the camera at a plastic item",
          variant: "destructive",
        });
      }

      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      setProcessingTime(duration);
      
      console.log('Detection complete:', data);
    } catch (error) {
      console.error('Classification error:', error);
      toast({
        title: "Classification failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Recycle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Smart Plastic Classification</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Waste Detection System</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <CameraFeed
              isActive={isDetecting}
              detectionBox={detectionBox}
              onError={(error) => console.error('Camera error:', error)}
            />
            
            <ControlPanel
              isDetecting={isDetecting}
              isProcessing={isProcessing}
              onStartDetection={handleStartDetection}
              onStopDetection={handleStopDetection}
              onCapture={handleCapture}
            />

            <StatsDisplay
              totalDetections={totalDetections}
              averageConfidence={avgConfidence}
              processingTime={processingTime}
            />
          </div>

          <div className="space-y-4">
            <DetectionResults
              resinCode={detectedResinCode}
              confidence={confidence}
              isProcessing={isProcessing}
            />
            
            {detectedResinCode && (
              <RecyclingInfo resinCode={detectedResinCode} />
            )}
          </div>
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Smart Plastic Classification System - Automated waste segregation for sustainable recycling
          </p>
        </div>
      </footer>
    </div>
  );
}
