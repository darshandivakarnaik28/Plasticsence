import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { plasticTypes, type ResinCode } from '@shared/schema';
import { Recycle, Package, Droplet, AlertTriangle } from 'lucide-react';

interface RecyclingInfoProps {
  resinCode: ResinCode;
}

const plasticDetails = {
  1: {
    commonUses: ['Water bottles', 'Soda bottles', 'Food containers'],
    recyclingTips: 'Rinse containers before recycling. Remove caps and labels if possible.',
    characteristics: 'Clear, tough, and heat-resistant',
    color: 'hsl(142, 70%, 45%)',
  },
  2: {
    commonUses: ['Milk jugs', 'Detergent bottles', 'Shopping bags'],
    recyclingTips: 'Clean and dry before recycling. Widely accepted in curbside programs.',
    characteristics: 'Opaque, waxy feel, floats in water',
    color: 'hsl(173, 65%, 40%)',
  },
  3: {
    commonUses: ['Pipes', 'Window frames', 'Credit cards'],
    recyclingTips: 'Rarely recycled. Check with local facilities for specialty programs.',
    characteristics: 'Rigid, can be transparent or opaque',
    color: 'hsl(0, 70%, 45%)',
  },
  4: {
    commonUses: ['Squeezable bottles', 'Plastic bags', 'Bread bags'],
    recyclingTips: 'Take to store drop-off locations. Not accepted in most curbside programs.',
    characteristics: 'Soft, flexible, translucent',
    color: 'hsl(197, 60%, 40%)',
  },
  5: {
    commonUses: ['Yogurt containers', 'Bottle caps', 'Straws'],
    recyclingTips: 'Widely recyclable. Check local guidelines for acceptance.',
    characteristics: 'Hard but flexible, heat-resistant',
    color: 'hsl(217, 55%, 40%)',
  },
  6: {
    commonUses: ['Disposable cups', 'Egg cartons', 'Foam packaging'],
    recyclingTips: 'Difficult to recycle. Limited facilities accept polystyrene.',
    characteristics: 'Lightweight, can be rigid or foam',
    color: 'hsl(262, 50%, 40%)',
  },
  7: {
    commonUses: ['Mixed plastics', 'CDs', 'Baby bottles'],
    recyclingTips: 'Mixed category. Recycling varies by specific plastic type.',
    characteristics: 'Variable properties',
    color: 'hsl(290, 50%, 40%)',
  },
} as const;

export default function RecyclingInfo({ resinCode }: RecyclingInfoProps) {
  const plastic = plasticTypes[resinCode];
  const details = plasticDetails[resinCode];

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Recycle className="w-5 h-5 text-primary" />
          Recycling Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium mb-1">Common Uses</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {details.commonUses.map((use, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-primary mt-1">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Droplet className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium mb-1">Characteristics</p>
              <p className="text-sm text-muted-foreground">{details.characteristics}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium mb-1">Recycling Tips</p>
              <p className="text-sm text-muted-foreground">{details.recyclingTips}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
