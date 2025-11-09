import DetectionHistory from '../DetectionHistory';

export default function DetectionHistoryExample() {
  const mockHistory = [
    { id: '1', resinCode: 1 as const, confidence: 94, timestamp: Date.now() - 5000 },
    { id: '2', resinCode: 2 as const, confidence: 88, timestamp: Date.now() - 15000 },
    { id: '3', resinCode: 5 as const, confidence: 92, timestamp: Date.now() - 30000 },
  ];

  return (
    <div className="space-y-4">
      <DetectionHistory history={mockHistory} onClear={() => console.log('Clear history')} />
      <DetectionHistory history={[]} />
    </div>
  );
}
