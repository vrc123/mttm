import styles from '@/styles/pages/EditDate.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'
import DateForm from '@/components/forms/DateForm'
import Error from '@/components/Error'

interface Context {
    params: { id: number}
}

export async function getServerSideProps(context: Context) {
    const id = context.params.id;
    const { data: analysis } = await supabase.from("analyses")
    .select('id, date')
    .eq('id', id)
    .single()
    return {
        props: {
            analysis,
        },
    }
}

interface Analysis {
    id: number
    date: string;
}

interface EditDateProps {
    analysis: Analysis;
}

export default function EditDate({ analysis }: EditDateProps) {

    const [date, setDate] = useState(analysis.date)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
  
    const router = useRouter()
  
    async function editDate(e: { preventDefault: () => void }) {
        e.preventDefault()
  
        let validationArray = []
  
        if (!date) {
          validationArray.push('- Select a date')
        }
  
        if (validationArray.length === 0) {

            const { data, error } = await supabase
            .from('analyses')
            .update({
                date: date
            }).eq('id', analysis.id).select('*')

            if (data) {
                router.push('/my-analyses/' + analysis.id)
            }

            if (error) {
                setError(true)
            }

        } else {
          setValidation(true)
          setValidations(validationArray)
        }
    }

    return (
        <div className={styles.editDate}>
            <h1>Edit date</h1>
            <DateForm
                buttonLabel='Edit'
                dateValue={date}
                validationValue={validation}
                validationsValue={validations}
                onChangeDate={(e) => setDate(e.target.value)}
                changeValidation={setValidation}
                onSubmit={editDate} 
            />
            <Error error={error} setError={setError} />
        </div>
    )
}