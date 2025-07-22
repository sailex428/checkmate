import { useDroppable } from "@dnd-kit/core";

const DroppableSquare = ({ id }: { id: string }) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef} className="w-full h-full" />;
};

export default DroppableSquare;
