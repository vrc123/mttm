import styles from '@/styles/pages/AddForehandServes.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveFhServesId } from '@/features/servesSlice'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'
import ServesForm from '@/components/forms/ServesForm'

export default function AddForehandServes() {

    const [serves, setServes] = useState('')
    const [longFh, setLongFh] = useState('')
    const [longMiddle, setLongMiddle] = useState('')
    const [longBh, setLongBh] = useState('')
    const [halfLongFh, setHalfLongFh] = useState('')
    const [halfLongMiddle, setHalfLongMiddle] = useState('')
    const [halfLongBh, setHalfLongBh] = useState('')
    const [shortFh, setShortFh] = useState('')
    const [shortMiddle, setShortMiddle] = useState('')
    const [shortBh, setShortBh] = useState('')
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const router = useRouter()
    
    async function addFhServes(e: { preventDefault: () => void }) {
        e.preventDefault()

        
        let validationArray = [];

        if (isNaN(Number(serves))) {
            validationArray.push("- Forehand serves needs to be a number")
        }

        if (isNaN(Number(longFh))) {
            validationArray.push("- Forehand serves long forehand needs to be a number")
        }

        if (isNaN(Number(longMiddle))) {
            validationArray.push("- Forehand serves long middle needs to be a number")
        }

        if (isNaN(Number(longBh))) {
            validationArray.push("- Forehand serves long backhand needs to be a number")
        }

        if (isNaN(Number(halfLongFh))) {
            validationArray.push("- Forehand serves half long forehand needs to be a number")
        }

        if (isNaN(Number(halfLongMiddle))) {
            validationArray.push("- Forehand serves half long middle needs to be a number")
        }

        if (isNaN(Number(halfLongBh))) {
            validationArray.push("- Forehand serves half long backhand needs to be a number")
        }

        if (isNaN(Number(shortFh))) {
            validationArray.push("- Forehand serves short forehand needs to be a number")
        }

        if (isNaN(Number(shortMiddle))) {
            validationArray.push("- Forehand serves short middle needs to be a number")
        }

        if (isNaN(Number(shortBh))) {
            validationArray.push("- Forehand serves short backhand needs to be a number")
        }

        if (!isNaN(Number(serves))) {
            if (Number(serves) != Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh) && !isNaN(Number(longFh)) && !isNaN(Number(longMiddle)) && !isNaN(Number(longBh)) && !isNaN(Number(halfLongFh)) && !isNaN(Number(halfLongMiddle)) && !isNaN(Number(halfLongBh)) && !isNaN(Number(shortFh)) && !isNaN(Number(shortMiddle)) && !isNaN(Number(shortBh))) {
                validationArray.push(`- You need to distribute ${Number(serves) - (Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh))} forehand serves`)
            }
        }

        if (validationArray.length === 0) {

            const { data, error } = await supabase
            .from('forehandServes')
            .insert([{
                longFh: longFh,
                longMiddle: longMiddle,
                longBh: longBh,
                halfLongFh: halfLongFh,
                halfLongMiddle: halfLongMiddle,
                halfLongBh: halfLongBh,
                shortFh: shortFh,
                shortMiddle: shortMiddle,
                shortBh: shortBh,
            }]).select('*')

            if (data) {
                dispatch(saveFhServesId(data[0].id))
                router.push('/my-analyses/create/backhand-serves')
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
        <div className={styles.addForehandServes}>
            <h1>Add forehand serves</h1>
            <ServesForm
                buttonLabel='Next'
                servesValue={serves}
                onChangeServes={(e) => setServes(e.target.value)}
                longFhValue={longFh}
                onChangeLongFh={(e) => setLongFh(e.target.value)}
                longMiddleValue={longMiddle}
                onChangeLongMiddle={(e) => setLongMiddle(e.target.value)}
                longBhValue={longBh}
                onChangeLongBh={(e) => setLongBh(e.target.value)}
                halfLongFhValue={halfLongFh}
                onChangeHalfLongFh={(e) => setHalfLongFh(e.target.value)}
                halfLongMiddleValue={halfLongMiddle}
                onChangeHalfLongMiddle={(e) => setHalfLongMiddle(e.target.value)}
                halfLongBhValue={halfLongBh}
                onChangeHalfLongBh={(e) => setHalfLongBh(e.target.value)}
                shortFhValue={shortFh}
                onChangeShortFh={(e) => setShortFh(e.target.value)}
                shortMiddleValue={shortMiddle}
                onChangeShortMiddle={(e) => setShortMiddle(e.target.value)}
                shortBhValue={shortBh}
                onChangeShortBh={(e) => setShortBh(e.target.value)}
                validationValue={validation}
                validationsValue={validations}
                errorValue={error}
                changeValidation={setValidation}
                changeError={setError}
                onSubmit={addFhServes}
            />
        </div>
    )
}