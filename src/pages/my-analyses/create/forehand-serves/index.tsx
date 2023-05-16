import styles from '@/styles/pages/AddForehandServes.module.css'
import ForehandServesForm from '@/components/forms/ForehandServesForm'

export default function AddForehandServes() {

    return (
        <div className={styles.addForehandServes}>
            <h1>Add forehand serves</h1>
            <ForehandServesForm />
        </div>
    )
}