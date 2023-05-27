import styles from '@/styles/pages/CreateAnalysis.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveDate } from '@/features/analysisSlice'
import { useRouter } from 'next/router'
import DateForm from '@/components/forms/DateForm'

export default function CreateAnalysis() {

    const [date, setDate] = useState('')
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
  
    const router = useRouter()
  
    function addDate(e: { preventDefault: () => void }) {
        e.preventDefault()

        setIsLoading(true)
  
        let validationArray = []
  
        if (!date) {
          validationArray.push('- Select a date')
        }
  
        if (validationArray.length === 0) {
            dispatch(saveDate(date))
            router.push('/my-analyses/create/opponent')
        } else {
            setIsLoading(false)
            setValidation(true)
            setValidations(validationArray)
        }
    }

    return (
        <div className={styles.createAnalysis}>
            <h1>Create an analysis</h1>
            <DateForm
                buttonLabel='Next'
                dateValue={date}
                validationValue={validation}
                validationsValue={validations}
                isLoadingValue={isLoading}
                onChangeDate={(e) => setDate(e.target.value)}
                changeValidation={setValidation}
                onSubmit={addDate} 
            />
        </div>
    )
}