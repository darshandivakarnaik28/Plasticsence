import ControlPanel from '../ControlPanel';
import { useState } from 'react';

export default function ControlPanelExample() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="space-y-4">
      <ControlPanel
        isDetecting={isDetecting}
        isProcessing={isProcessing}
        onStartDetection={() => {
          setIsDetecting(true);
          console.log('Start detection');
        }}
        onStopDetection={() => {
          setIsDetecting(false);
          console.log('Stop detection');
        }}
        onCapture={() => {
          setIsProcessing(true);
          console.log('Capture frame');
          setTimeout(() => setIsProcessing(false), 1500);
        }}
      />
    </div>
  );
}
