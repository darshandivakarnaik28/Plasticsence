import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Square, Camera, Loader2 } from 'lucide-react';

interface ControlPanelProps {
  isDetecting: boolean;
  isProcessing: boolean;
  onStartDetection: () => void;
  onStopDetection: () => void;
  onCapture: () => void;
}

export default function ControlPanel({
  isDetecting,
  isProcessing,
  onStartDetection,
  onStopDetection,
  onCapture,
}: ControlPanelProps) {
  return (
    <Card className="border-2">
      <CardContent className="flex items-center gap-3 p-4">
        {!isDetecting ? (
          <Button
            onClick={onStartDetection}
            className="gap-2"
            size="lg"
            data-testid="button-start-detection"
          >
            <Play className="w-4 h-4" />
            Start Detection
          </Button>
        ) : (
          <Button
            onClick={onStopDetection}
            variant="destructive"
            className="gap-2"
            size="lg"
            data-testid="button-stop-detection"
          >
            <Square className="w-4 h-4" />
            Stop Detection
          </Button>
        )}
        
        <Button
          onClick={onCapture}
          variant="secondary"
          className="gap-2"
          size="lg"
          disabled={!isDetecting || isProcessing}
          data-testid="button-capture"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              Capture & Analyze
            </>
          )}
        </Button>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isDetecting ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
              }`}
              data-testid="status-camera"
            />
            <span className="text-sm text-muted-foreground">
              Camera {isDetecting ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
