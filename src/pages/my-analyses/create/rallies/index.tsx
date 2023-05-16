import styles from '@/styles/pages/AddRallies.module.css'
import RalliesForm from '@/components/forms/RalliesForm'

export default function AddRallies() {

    return (
        <div className={styles.addRallies} >
            <h1>Add match rallies</h1>
            <RalliesForm />
        </div>
    )
}