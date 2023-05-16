import styles from '@/styles/components/Validation.module.css'
import Modal from 'react-modal'
import Button from './Button'

interface ValidationProps {
    validation: boolean;
    validations: string[];
    setValidation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Validation({validation, validations, setValidation}: ValidationProps) {

    function closeModal() {
        setValidation(false)
    }

    return (
        <Modal overlayClassName={styles.validationOverlay} className={styles.validation} isOpen={validation} onRequestClose={closeModal} ariaHideApp={false}>
            <h2>Error</h2>
            <p>Change the following</p>
            <div>
                {validations.map((validation, index) => {
                    return (
                        <p key={index}>{validation}</p>
                    )
                })}
            </div>
            <Button variant='secondary' label="Close" onClick={closeModal} />
        </Modal>
    );
}