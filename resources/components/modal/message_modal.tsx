import styles from '../../css/modal.module.css'
type ModalProps = {
  message: string
  open: boolean
  type: 'error' | 'success'
}

const MessageModal = ({ message, open, type }: ModalProps) => {
  return open ? (
    <dialog className={styles.modal} data-type={type}>
      <p>{message}</p>
    </dialog>
  ) : null
}

export default MessageModal
