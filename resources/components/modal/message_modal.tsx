import styles from '../../css/modal.module.css'
import { motion } from 'framer-motion'
type ModalProps = {
  message: string
  open: boolean
  type: 'error' | 'success'
}

const MessageModal = ({ message, open, type }: ModalProps) => {
  return open ? (
    <motion.dialog
      initial={{ opacity: 0, y: -50, x: '-100%' }}
      animate={{ opacity: 1, y: 0, x: '-100%', transition: { duration: 0.3 } }}
      exit={{ opacity: 0, y: -50, x: '-100%' }}
      className={styles.modal}
      data-type={type}
    >
      <p>{message}</p>
    </motion.dialog>
  ) : null
}

export default MessageModal
