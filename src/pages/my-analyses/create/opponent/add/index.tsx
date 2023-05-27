import styles from '@/styles/pages/AddOpponent.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import OpponentForm from '@/components/forms/OpponentForm'
import { supabase } from '../../../../../../supabase-client'
import { saveOpponentId } from '@/features/analysisSlice'

export default function AddOpponent() {

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
            .from('opponents')
            .insert([{
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                country: country,
                birthday: birthday
            }]).select('*')
            .single()
    
            if (data) {
                dispatch(saveOpponentId(data.id))
                
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
        <div className={styles.addOpponent}>
            <h1>Add and select opponent</h1>
            <OpponentForm 
                buttonLabel='Add opponent'
                firstNameValue={firstName}
                middleNameValue={middleName}
                lastNameValue={lastName}
                countryValue={country}
                birthdayValue={birthday}
                validationValue={validation}
                validationsValue={validations}
                errorValue={error}
                onChangeFirstName={(e) => setFirstName(e.target.value)}
                onChangeMiddleName={(e) => setMiddleName(e.target.value)}
                onChangeLastName={(e) => setLastName(e.target.value)}
                onChangeCountry={(e) => setCountry(e.target.value)}
                onChangeBirthday={(e) => setBirthday(e.target.value)}
                changeValidation={setValidation}
                changeError={setError}
                onSubmit={addOpponent}
            />
        </div>
    )
}