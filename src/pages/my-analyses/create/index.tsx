import styles from '@/styles/pages/CreateAnalysis.module.css'
import DateForm from '@/components/forms/DateForm'

export default function CreateAnalysis() {

    return (
        <div className={styles.createAnalysis}>
            <h1>Create an analysis</h1>
            <DateForm />
        </div>
    )
}