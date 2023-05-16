import styles from '@/styles/components/forms/OpponentForm.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveOpponentId } from '@/features/analysisSlice'
import { useRouter } from 'next/router'
import { supabase } from '../../../supabase-client'
import TextField from '../TextField'
import CalenderPicker from '../CalenderPicker'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'

export default function OpponentForm() {

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [birthday, setBirthday] = useState('')
  const [validation, setValidation] = useState(false)
  const [validations, setValidations] = useState<string[]>([])
  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const router = useRouter()
  
  async function addOpponent(e: { preventDefault: () => void }) {
    e.preventDefault()

    let validationArray = []
    
    if (!firstName) {
      validationArray.push('Fill the first name field')
    }

    if (firstName) {
      if (firstName[0] != firstName[0].toUpperCase()) {
        validationArray.push('First name needs to be capitalized')
      }
    }
    
    if (middleName != '') {
      if (middleName[0] != middleName[0].toUpperCase()) {
        validationArray.push('Middle name needs to be capitalized')
      }
    }

    if (!lastName) {
      validationArray.push('Fill the last name field')
    }

    if (lastName) {
      if (lastName[0] != lastName[0].toUpperCase()) {
        validationArray.push('Last name needs to be capitalized')
      }
    }
    
    if (!country) {
      validationArray.push('Fill the country field')
    }

    if (country) {
      if (country[0] != country[0].toUpperCase()) {
        validationArray.push('Country name needs to be capitalized')
      }
    }

    if (!birthday) {
      validationArray.push('Fill the birthday field')
    }

    if (validationArray.length === 0) {

      const { data, error } = await supabase
      .from('opponentss')
      .insert([{
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        country: country,
        birthday: birthday
      }]).select('*')

      if (data) {
        dispatch(saveOpponentId(data[0].id))
        
        router.push('/my-analyses/create/score')
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
    <form className={styles.opponentForm} onSubmit={addOpponent}>
      <p>Fill in the opponent information:</p>
      <TextField placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <TextField placeholder='Middle Name' value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
      <TextField placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <TextField placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />
      <CalenderPicker value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      <Button variant='primary' label='Add opponent' />
      <Validation validation={validation} setValidation={setValidation} validations={validations} />
      <Error error={error} setError={setError} />
    </form>
  )
}