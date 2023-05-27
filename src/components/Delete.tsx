import styles from '@/styles/components/Delete.module.css'
import Modal from 'react-modal'
import Button from './Button'

interface DeleteProps {
    deleteItem: boolean;
    setDeleteItem: React.Dispatch<React.SetStateAction<boolean>>;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    isLoadingValue: boolean;
    deleteFunction: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Delete({deleteItem, setDeleteItem, error, setError, isLoadingValue, deleteFunction}: DeleteProps) {

    function closeModal() {
        setError(false)
        setDeleteItem(false)
    }

    return (
        <Modal overlayClassName={styles.deleteOverlay} className={styles.delete} isOpen={deleteItem} onRequestClose={closeModal} ariaHideApp={false}>
            {!error && <div>
                <h2>Delete</h2>
                {!isLoadingValue && <div>
                    <p>Are you sure you want to delete?</p>
                    <Button variant='secondary' label="No" onClick={closeModal} />
                    <Button variant='delete' label="Yes" onClick={deleteFunction} />
                </div>}
                {isLoadingValue && <p className={styles.loading}>Loading...</p>}
            </div>}
            {error && <div>
                <h2>Error</h2>
                <p>Something went wrong</p>
                <Button variant='secondary' label="Close" onClick={closeModal} />
            </div>}
        </Modal>
    );
}