import Modal from "../ui/Modal"
import TaskForm from "./TaskForm"

export default function TaskModal({
  open,
  onClose,
  initialValues,
  onSubmit,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        initialValues
          ? "Edit Task"
          : "Create Task"
      }
    >
      <TaskForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}