import { Card, CardContent } from '@/components/ui/card';
import { Activity, Target, Clock } from 'lucide-react';

interface StatsDisplayProps {
  totalDetections: number;
  averageConfidence: number;
  processingTime: number;
}

export default function StatsDisplay({
  totalDetections,
  averageConfidence,
  processingTime,
}: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-2">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-0.5">Detections</p>
            <p className="text-2xl font-bold" data-testid="text-total-detections">
              {totalDetections}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-0.5">Avg. Confidence</p>
            <p className="text-2xl font-bold" data-testid="text-avg-confidence">
              {averageConfidence}%
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-0.5">Processing Time</p>
            <p className="text-2xl font-bold" data-testid="text-processing-time">
              {processingTime}ms
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
