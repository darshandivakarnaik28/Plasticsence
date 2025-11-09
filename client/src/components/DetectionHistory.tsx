import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { plasticTypes, type ResinCode } from '@shared/schema';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

interface HistoryItem {
  id: string;
  resinCode: ResinCode;
  confidence: number;
  timestamp: number;
}

interface DetectionHistoryProps {
  history: HistoryItem[];
  onClear?: () => void;
}

export default function DetectionHistory({ history, onClear }: DetectionHistoryProps) {
  if (history.length === 0) {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Detection History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No detections yet. Capture frames to build your history.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Detection History
        </CardTitle>
        {onClear && (
          <button
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-foreground"
            data-testid="button-clear-history"
          >
            Clear
          </button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {history.map((item) => {
              const plastic = plasticTypes[item.resinCode];
              const date = new Date(item.timestamp);
              const timeStr = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-md bg-muted/50 hover-elevate"
                  data-testid={`history-item-${item.id}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{plastic.code}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{plastic.name}</span>
                      <Badge
                        variant={plastic.recyclable ? 'default' : 'secondary'}
                        className="h-5 text-xs gap-1"
                      >
                        {plastic.recyclable ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {plastic.recyclable ? 'Recyclable' : 'Non-Recyclable'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.confidence}% confidence</span>
                      <span>•</span>
                      <span>{timeStr}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
