import styles from '@/styles/pages/AddBackhandRecieves.module.css'
import BackhandRecievesForm from '@/components/forms/BackhandRecievesForm'

export default function AddBackhandRecieves() {

    return (
        <div className={styles.addBackhandRecieves}>
            <h1>Add backhand recieves</h1>
            <BackhandRecievesForm />
        </div>
    )
}