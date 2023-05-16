import styles from '@/styles/pages/AddOpponent.module.css'
import OpponentForm from '@/components/forms/OpponentForm'

export default function AddOpponent() {

    return (
        <div className={styles.addOpponent}>
            <h1>Add an opponent</h1>
            <OpponentForm />
        </div>
    )
}