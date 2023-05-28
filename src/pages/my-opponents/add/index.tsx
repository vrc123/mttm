import styles from '@/styles/pages/AddOpponent.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import OpponentForm from '@/components/forms/OpponentForm'
import { supabase } from '../../../../supabase-client'

export default function AddOpponent() {

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [country, setCountry] = useState('')
    const [birthday, setBirthday] = useState('')
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    async function addOpponent(e: { preventDefault: () => void }) {
        e.preventDefault()

        setIsLoading(true)
    
        let validationArray = []
        
        if (!firstName) {
            validationArray.push('- Fill the first name field')
        }
    
        if (firstName) {
            if (firstName[0] != firstName[0].toUpperCase()) {
                validationArray.push('- First name needs to be capitalized')
            }
        }
        
        if (middleName != '') {
            if (middleName[0] != middleName[0].toUpperCase()) {
                validationArray.push('- Middle name needs to be capitalized')
            }
        }
    
        if (!lastName) {
            validationArray.push('- Fill the last name field')
        }
    
        if (lastName) {
            if (lastName[0] != lastName[0].toUpperCase()) {
                validationArray.push('- Last name needs to be capitalized')
            }
        }
        
        if (!country) {
            validationArray.push('- Fill the country field')
        }
    
        if (country) {
            if (country[0] != country[0].toUpperCase()) {
                validationArray.push('- Country name needs to be capitalized')
            }
        }
    
        if (!birthday) {
            validationArray.push('- Fill the birthday field')
        }
    
        if (validationArray.length === 0) {
    
            const { error } = await supabase
            .from('opponents')
            .insert([{
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                country: country,
                birthday: birthday
            }])
    
            if (!error) {       
                router.push('/my-opponents')
            }
    
            if (error) {
                setIsLoading(false)
                setError(true)
            }
    
        } else {
            setIsLoading(false)
            setValidation(true)
            setValidations(validationArray)
        }
    }

    return (
        <div className={styles.addOpponent}>
            <h1>Add an opponent</h1>
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
                isLoadingValue={isLoading}
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