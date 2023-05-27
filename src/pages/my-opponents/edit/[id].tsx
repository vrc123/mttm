import styles from '@/styles/pages/EditOpponent.module.css'
import { useState } from 'react'
import { supabase } from '../../../../supabase-client'
import { useRouter } from 'next/router'
import OpponentForm from '@/components/forms/OpponentForm'

interface Context {
    params: { id: number}
}

export async function getServerSideProps(context: Context) {
    const id = context.params.id;
    const { data: opponent } = await supabase.from("opponents").select('*').eq('id', id).single()
    return {
        props: {
            opponent,
        },
    }
}

interface Opponent {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    country: string;
    birthday: string;
}

interface EditOpponentProps {
    opponent: Opponent;
}

export default function EditOpponent({ opponent }: EditOpponentProps) {

    const [firstName, setFirstName] = useState(opponent.firstName)
    const [middleName, setMiddleName] = useState(opponent.middleName)
    const [lastName, setLastName] = useState(opponent.lastName)
    const [country, setCountry] = useState(opponent.country)
    const [birthday, setBirthday] = useState(opponent.birthday)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)

    const router = useRouter()
    
    async function editOpponent(e: { preventDefault: () => void }) {
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

            const { error } = await supabase
            .from('opponents')
            .update({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                country: country,
                birthday: birthday
            }).eq('id', opponent.id)

            if (!error) {
                router.push('/my-opponents/')
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
        <div className={styles.editOpponent}>
            <h1>Edit opponent</h1>
            <OpponentForm
                buttonLabel='Edit'
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
                onSubmit={editOpponent}
            />
        </div>
    )
}   