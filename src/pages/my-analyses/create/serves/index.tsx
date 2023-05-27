import styles from '@/styles/pages/AddServes.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveFhServes, saveBhServes } from '@/features/servesSlice'
import { useRouter } from 'next/router'
import ServesForm from '@/components/forms/ServesForm'

export default function AddServes() {

    const [fhServes, setFhServes] = useState('')
    const [fhLongFh, setFhLongFh] = useState('')
    const [fhLongMiddle, setFhLongMiddle] = useState('')
    const [fhLongBh, setFhLongBh] = useState('')
    const [fhHalfLongFh, setFhHalfLongFh] = useState('')
    const [fhHalfLongMiddle, setFhHalfLongMiddle] = useState('')
    const [fhHalfLongBh, setFhHalfLongBh] = useState('')
    const [fhShortFh, setFhShortFh] = useState('')
    const [fhShortMiddle, setFhShortMiddle] = useState('')
    const [fhShortBh, setFhShortBh] = useState('')
    const [bhServes, setBhServes] = useState('')
    const [bhLongFh, setBhLongFh] = useState('')
    const [bhLongMiddle, setBhLongMiddle] = useState('')
    const [bhLongBh, setBhLongBh] = useState('')
    const [bhHalfLongFh, setBhHalfLongFh] = useState('')
    const [bhHalfLongMiddle, setBhHalfLongMiddle] = useState('')
    const [bhHalfLongBh, setBhHalfLongBh] = useState('')
    const [bhShortFh, setBhShortFh] = useState('')
    const [bhShortMiddle, setBhShortMiddle] = useState('')
    const [bhShortBh, setBhShortBh] = useState('')
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const router = useRouter()
    
    async function addServes(e: { preventDefault: () => void }) {
        e.preventDefault()

        setIsLoading(true)

        let validationArray = [];

        if (isNaN(Number(fhServes))) {
            validationArray.push("- Forehand serves needs to be a number")
        }

        if (isNaN(Number(fhLongFh))) {
            validationArray.push("- Forehand serves long forehand needs to be a number")
        }

        if (isNaN(Number(fhLongMiddle))) {
            validationArray.push("- Forehand serves long middle needs to be a number")
        }

        if (isNaN(Number(fhLongBh))) {
            validationArray.push("- Forehand serves long backhand needs to be a number")
        }

        if (isNaN(Number(fhHalfLongFh))) {
            validationArray.push("- Forehand serves half long forehand needs to be a number")
        }

        if (isNaN(Number(fhHalfLongMiddle))) {
            validationArray.push("- Forehand serves half long middle needs to be a number")
        }

        if (isNaN(Number(fhHalfLongBh))) {
            validationArray.push("- Forehand serves half long backhand needs to be a number")
        }

        if (isNaN(Number(fhShortFh))) {
            validationArray.push("- Forehand serves short forehand needs to be a number")
        }

        if (isNaN(Number(fhShortMiddle))) {
            validationArray.push("- Forehand serves short middle needs to be a number")
        }

        if (isNaN(Number(fhShortBh))) {
            validationArray.push("- Forehand serves short backhand needs to be a number")
        }

        if (!isNaN(Number(fhServes))) {
            if (Number(fhServes) != Number(fhLongFh) + Number(fhLongMiddle) + Number(fhLongBh) + Number(fhHalfLongFh) + Number(fhHalfLongMiddle) + Number(fhHalfLongBh) + Number(fhShortFh) + Number(fhShortMiddle) + Number(fhShortBh) && !isNaN(Number(fhLongFh)) && !isNaN(Number(fhLongMiddle)) && !isNaN(Number(fhLongBh)) && !isNaN(Number(fhHalfLongFh)) && !isNaN(Number(fhHalfLongMiddle)) && !isNaN(Number(fhHalfLongBh)) && !isNaN(Number(fhShortFh)) && !isNaN(Number(fhShortMiddle)) && !isNaN(Number(fhShortBh))) {
                validationArray.push(`- You need to distribute ${Number(fhServes) - (Number(fhLongFh) + Number(fhLongMiddle) + Number(fhLongBh) + Number(fhHalfLongFh) + Number(fhHalfLongMiddle) + Number(fhHalfLongBh) + Number(fhShortFh) + Number(fhShortMiddle) + Number(fhShortBh))} forehand serves`)
            }
        }

        if (isNaN(Number(bhServes))) {
            validationArray.push("- Backhand serves needs to be a number")
        }

        if (isNaN(Number(bhLongFh))) {
            validationArray.push("- Backhand serves long forehand needs to be a number")
        }

        if (isNaN(Number(bhLongMiddle))) {
            validationArray.push("- Backhand serves long middle needs to be a number")
        }

        if (isNaN(Number(bhLongBh))) {
            validationArray.push("- Backhand serves long backhand needs to be a number")
        }

        if (isNaN(Number(bhHalfLongFh))) {
            validationArray.push("- Backhand serves half long forehand needs to be a number")
        }

        if (isNaN(Number(bhHalfLongMiddle))) {
            validationArray.push("- Backhand serves half long middle needs to be a number")
        }

        if (isNaN(Number(bhHalfLongBh))) {
            validationArray.push("- Backhand serves half long backhand needs to be a number")
        }

        if (isNaN(Number(bhShortFh))) {
            validationArray.push("- Backhand serves short forehand needs to be a number")
        }

        if (isNaN(Number(bhShortMiddle))) {
            validationArray.push("- Backhand serves short middle needs to be a number")
        }

        if (isNaN(Number(bhShortBh))) {
            validationArray.push("- Backhand serves short backhand needs to be a number")
        }

        if (!isNaN(Number(bhServes))) {
            if (Number(bhServes) != Number(bhLongFh) + Number(bhLongMiddle) + Number(bhLongBh) + Number(bhHalfLongFh) + Number(bhHalfLongMiddle) + Number(bhHalfLongBh) + Number(bhShortFh) + Number(bhShortMiddle) + Number(bhShortBh) && !isNaN(Number(bhLongFh)) && !isNaN(Number(bhLongMiddle)) && !isNaN(Number(bhLongBh)) && !isNaN(Number(bhHalfLongFh)) && !isNaN(Number(bhHalfLongMiddle)) && !isNaN(Number(bhHalfLongBh)) && !isNaN(Number(bhShortFh)) && !isNaN(Number(bhShortMiddle)) && !isNaN(Number(bhShortBh))) {
                validationArray.push(`- You need to distribute ${Number(bhServes) - (Number(bhLongFh) + Number(bhLongMiddle) + Number(bhLongBh) + Number(bhHalfLongFh) + Number(bhHalfLongMiddle) + Number(bhHalfLongBh) + Number(bhShortFh) + Number(bhShortMiddle) + Number(bhShortBh))} backhand serves`)
            }
        }

        if (validationArray.length === 0) {

            const fhServes = {
                longFh: fhLongFh,
                longMiddle: fhLongMiddle,
                longBh: fhLongBh,
                halfLongFh: fhHalfLongFh,
                halfLongMiddle: fhHalfLongMiddle,
                halfLongBh: fhHalfLongBh,
                shortFh: fhShortFh,
                shortMiddle: fhShortMiddle,
                shortBh: fhShortBh,
            }

            const bhServes = {
                longFh: bhLongFh,
                longMiddle: bhLongMiddle,
                longBh: bhLongBh,
                halfLongFh: bhHalfLongFh,
                halfLongMiddle: bhHalfLongMiddle,
                halfLongBh: bhHalfLongBh,
                shortFh: bhShortFh,
                shortMiddle: bhShortMiddle,
                shortBh: bhShortBh,
            }

            dispatch(saveFhServes(fhServes))
            dispatch(saveBhServes(bhServes))

            router.push('/my-analyses/create/recieves')

        } else {
            setIsLoading(false)
            setValidation(true)
            setValidations(validationArray)
        }
    }

    return (
        <div className={styles.addServes}>
            <h1>Add serves</h1>
            <ServesForm
                buttonLabel='Next'
                fhServesValue={fhServes}
                onChangeFhServes={(e) => setFhServes(e.target.value)}
                fhLongFhValue={fhLongFh}
                onChangeFhLongFh={(e) => setFhLongFh(e.target.value)}
                fhLongMiddleValue={fhLongMiddle}
                onChangeFhLongMiddle={(e) => setFhLongMiddle(e.target.value)}
                fhLongBhValue={fhLongBh}
                onChangeFhLongBh={(e) => setFhLongBh(e.target.value)}
                fhHalfLongFhValue={fhHalfLongFh}
                onChangeFhHalfLongFh={(e) => setFhHalfLongFh(e.target.value)}
                fhHalfLongMiddleValue={fhHalfLongMiddle}
                onChangeFhHalfLongMiddle={(e) => setFhHalfLongMiddle(e.target.value)}
                fhHalfLongBhValue={fhHalfLongBh}
                onChangeFhHalfLongBh={(e) => setFhHalfLongBh(e.target.value)}
                fhShortFhValue={fhShortFh}
                onChangeFhShortFh={(e) => setFhShortFh(e.target.value)}
                fhShortMiddleValue={fhShortMiddle}
                onChangeFhShortMiddle={(e) => setFhShortMiddle(e.target.value)}
                fhShortBhValue={fhShortBh}
                onChangeFhShortBh={(e) => setFhShortBh(e.target.value)}
                bhServesValue={bhServes}
                onChangeBhServes={(e) => setBhServes(e.target.value)}
                bhLongFhValue={bhLongFh}
                onChangeBhLongFh={(e) => setBhLongFh(e.target.value)}
                bhLongMiddleValue={bhLongMiddle}
                onChangeBhLongMiddle={(e) => setBhLongMiddle(e.target.value)}
                bhLongBhValue={bhLongBh}
                onChangeBhLongBh={(e) => setBhLongBh(e.target.value)}
                bhHalfLongFhValue={bhHalfLongFh}
                onChangeBhHalfLongFh={(e) => setBhHalfLongFh(e.target.value)}
                bhHalfLongMiddleValue={bhHalfLongMiddle}
                onChangeBhHalfLongMiddle={(e) => setBhHalfLongMiddle(e.target.value)}
                bhHalfLongBhValue={bhHalfLongBh}
                onChangeBhHalfLongBh={(e) => setBhHalfLongBh(e.target.value)}
                bhShortFhValue={bhShortFh}
                onChangeBhShortFh={(e) => setBhShortFh(e.target.value)}
                bhShortMiddleValue={bhShortMiddle}
                onChangeBhShortMiddle={(e) => setBhShortMiddle(e.target.value)}
                bhShortBhValue={bhShortBh}
                onChangeBhShortBh={(e) => setBhShortBh(e.target.value)}
                validationValue={validation}
                validationsValue={validations}
                errorValue={error}
                isLoadingValue={isLoading}
                changeValidation={setValidation}
                changeError={setError}
                onSubmit={addServes}
            />
        </div>
    )
}