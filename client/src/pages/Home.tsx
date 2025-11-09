import { useState } from 'react';
import CameraFeed from '@/components/CameraFeed';
import DetectionResults from '@/components/DetectionResults';
import RecyclingInfo from '@/components/RecyclingInfo';
import ControlPanel from '@/components/ControlPanel';
import StatsDisplay from '@/components/StatsDisplay';
import ThemeToggle from '@/components/ThemeToggle';
import { Recycle } from 'lucide-react';
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

  const handleStartDetection = () => {
    setIsDetecting(true);
    console.log('Camera detection started');
  };

  const handleStopDetection = () => {
    setIsDetecting(false);
    setDetectionBox(null);
    console.log('Camera detection stopped');
  };

  const handleCapture = async () => {
    setIsProcessing(true);
    const startTime = performance.now();
    
    setTimeout(() => {
      const mockResinCodes: ResinCode[] = [1, 2, 3, 4, 5, 6, 7];
      const randomCode = mockResinCodes[Math.floor(Math.random() * mockResinCodes.length)];
      const randomConfidence = Math.floor(Math.random() * 20) + 80;
      
      setDetectedResinCode(randomCode);
      setConfidence(randomConfidence);
      
      setDetectionBox({
        x: 200,
        y: 150,
        width: 300,
        height: 250,
        label: `Resin #${randomCode}`,
        confidence: randomConfidence,
      });

      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      setTotalDetections(prev => prev + 1);
      setAvgConfidence(prev => {
        const newTotal = totalDetections + 1;
        return Math.round(((prev * totalDetections) + randomConfidence) / newTotal);
      });
      setProcessingTime(duration);
      
      setIsProcessing(false);
      console.log('Detection complete:', { resinCode: randomCode, confidence: randomConfidence });
    }, 1500);
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
