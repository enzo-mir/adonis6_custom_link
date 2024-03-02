import styles from '../../css/modal.module.css'
type ModalProps = {
  message: string
  open: boolean
}

const MessageModal = ({ message, open }: ModalProps) => {
  return open ? (
    <dialog className={styles.modal}>
      <p>{message}</p>
    </dialog>
  ) : null
}

export default MessageModal
