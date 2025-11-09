import RecyclingInfo from '../RecyclingInfo';

export default function RecyclingInfoExample() {
  return (
    <div className="space-y-4">
      <RecyclingInfo resinCode={1} />
      <RecyclingInfo resinCode={5} />
    </div>
  );
}
