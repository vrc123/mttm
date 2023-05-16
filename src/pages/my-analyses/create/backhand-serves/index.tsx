import styles from '@/styles/pages/AddBackhandServes.module.css'
import BackhandServesForm from '@/components/forms/BackhandServesForm'

export default function AddBackhandServes() {

    return (
        <div className={styles.addBackhandServes}>
            <h1>Add backhand serves</h1>
            <BackhandServesForm />
        </div>
    )
}