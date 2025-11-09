import DetectionResults from '../DetectionResults';

export default function DetectionResultsExample() {
  return (
    <div className="space-y-4">
      <DetectionResults resinCode={1} confidence={94.5} />
      <DetectionResults resinCode={3} confidence={87.2} />
      <DetectionResults resinCode={null} confidence={0} />
    </div>
  );
}
