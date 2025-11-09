import CameraFeed from '../CameraFeed';

export default function CameraFeedExample() {
  return (
    <CameraFeed
      isActive={false}
      detectionBox={{
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        label: 'PET #1',
        confidence: 94.5,
      }}
    />
  );
}
