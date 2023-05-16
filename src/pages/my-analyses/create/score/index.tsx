import styles from '@/styles/pages/AddScore.module.css'
import ScoreForm from '@/components/forms/ScoreForm'

export default function AddScore() {

    return (
        <div className={styles.addScore}>
            <h1>Add the score of the match</h1>
            <ScoreForm />
        </div>
    )
}