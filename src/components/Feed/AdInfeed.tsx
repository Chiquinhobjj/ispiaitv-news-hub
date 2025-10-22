import AdSlot from '@/components/AdSlot';

interface AdInfeedProps {
  position: number;
  useMock?: boolean;
}

export const AdInfeed = ({ position, useMock = false }: AdInfeedProps) => {
  const slotId = `infeed_home_${position}`;
  
  return (
    <div className="my-8">
      <AdSlot slotId={slotId} useMock={useMock} />
    </div>
  );
};
