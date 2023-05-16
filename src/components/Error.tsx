import styles from '@/styles/components/Error.module.css'
import Modal from 'react-modal'
import Button from './Button'

interface ErrorProps {
    error: boolean,
    setError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Error({error, setError}: ErrorProps) {

    function closeModal() {
        setError(false)
    }

    return (
        <Modal overlayClassName={styles.errorOverlay} className={styles.error} isOpen={error} onRequestClose={closeModal} ariaHideApp={false}>
            <h2>Error</h2>
            <p>Something went wrong</p>
            <Button variant='secondary' label="Close" onClick={closeModal} />
        </Modal>
    );
}