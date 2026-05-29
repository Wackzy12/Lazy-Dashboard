import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core"

export default function DndContextWrapper({
  children,
  onDragEnd,
}) {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  )
}