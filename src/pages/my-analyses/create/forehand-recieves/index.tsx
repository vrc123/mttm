import styles from '@/styles/pages/AddForehandRecieves.module.css'
import ForehandRecievesForm from '@/components/forms/ForehandRecievesForm'

export default function AddForehandRecieves() {

    return (
        <div className={styles.addForehandRecieves}>
            <h1>Add forehand recieves</h1>
            <ForehandRecievesForm />
        </div>
    )
}