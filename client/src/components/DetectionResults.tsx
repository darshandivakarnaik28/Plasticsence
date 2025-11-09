import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Activity } from 'lucide-react';
import { plasticTypes, type ResinCode } from '@shared/schema';
import { Progress } from '@/components/ui/progress';

interface DetectionResultsProps {
  resinCode: ResinCode | null;
  confidence: number;
  isProcessing?: boolean;
}

export default function DetectionResults({ resinCode, confidence, isProcessing }: DetectionResultsProps) {
  if (isProcessing) {
    return (
      <Card className="border-2">
        <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
          <Activity className="w-12 h-12 text-primary animate-pulse" />
          <p className="text-sm text-muted-foreground">Processing frame...</p>
        </CardContent>
      </Card>
    );
  }

  if (!resinCode) {
    return (
      <Card className="border-2">
        <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Activity className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium mb-1">No Detection</p>
            <p className="text-sm text-muted-foreground">Point camera at plastic item</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const plastic = plasticTypes[resinCode];

  return (
    <Card className="border-2">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">Detection Result</CardTitle>
          <Badge
            variant={plastic.recyclable ? 'default' : 'secondary'}
            className="gap-1.5"
            data-testid={`badge-recyclable-${plastic.recyclable}`}
          >
            {plastic.recyclable ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Recyclable
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5" />
                Non-Recyclable
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary" data-testid="text-resin-code">
                {plastic.code}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold mb-1" data-testid="text-plastic-type">
              {plastic.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">{plastic.fullName}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-semibold" data-testid="text-confidence">
                  {confidence}%
                </span>
              </div>
              <Progress value={confidence} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
