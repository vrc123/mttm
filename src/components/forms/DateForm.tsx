import styles from '@/styles/components/forms/DateForm.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { saveDate } from '@/features/analysisSlice'
import { useRouter } from 'next/router'
import CalenderPicker from '../CalenderPicker'
import Button from '../Button'
import Validation from '../Validation'

export default function DateForm() {

  const [validation, setValidation] = useState(false)
  const [validations, setValidations] = useState<string[]>([])

  const date = useSelector((state: RootState) => state.analysis.date)
  const dispatch = useDispatch()

  const router = useRouter()

  function addDate(e: { preventDefault: () => void }) {
      e.preventDefault()

      let validationArray = []

      if (!date) {
        validationArray.push('- Select a date')
      }

      if (validationArray.length === 0) {
        router.push('/my-analyses/create/opponent')
      } else {
        setValidation(true)
        setValidations(validationArray)
      }
  }

  return (
    <form className={styles.dateForm} onSubmit={addDate}>
      <p>Select the date the match was played:</p>
      <CalenderPicker value={date} onChange={(e) => dispatch(saveDate(e.target.value))}/>
      <Button variant='primary' label='Next' />
      <Validation validation={validation} setValidation={setValidation} validations={validations} />
    </form>
  )
}