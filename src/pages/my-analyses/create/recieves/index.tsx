import styles from '@/styles/pages/AddRecieves.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveFhRecieves, saveBhRecieves } from '@/features/recievesSlice'
import { useRouter } from 'next/router'
import RecievesForm from '@/components/forms/RecievesForm'

export default function AddRecieves() {

    const [fhRecieves, setFhRecieves] = useState('')
    const [fhLongFh, setFhLongFh] = useState('')
    const [fhLongMiddle, setFhLongMiddle] = useState('')
    const [fhLongBh, setFhLongBh] = useState('')
    const [fhHalfLongFh, setFhHalfLongFh] = useState('')
    const [fhHalfLongMiddle, setFhHalfLongMiddle] = useState('')
    const [fhHalfLongBh, setFhHalfLongBh] = useState('')
    const [fhShortFh, setFhShortFh] = useState('')
    const [fhShortMiddle, setFhShortMiddle] = useState('')
    const [fhShortBh, setFhShortBh] = useState('')
    const [bhRecieves, setBhRecieves] = useState('')
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

    const router = useRouter();
    
    async function addRecieves(e: { preventDefault: () => void }) {
        e.preventDefault()

        setIsLoading(true)
        
        let validationArray = [];

        if (isNaN(Number(fhRecieves))) {
            validationArray.push("- Forehand recieves needs to be a number")
        }

        if (isNaN(Number(fhLongFh))) {
            validationArray.push("- Forehand recieves long forehand needs to be a number")
        }

        if (isNaN(Number(fhLongMiddle))) {
            validationArray.push("- Forehand recieves long middle needs to be a number")
        }

        if (isNaN(Number(fhLongBh))) {
            validationArray.push("- Forehand recieves long backhand needs to be a number")
        }

        if (isNaN(Number(fhHalfLongFh))) {
            validationArray.push("- Forehand recieves half long forehand needs to be a number")
        }

        if (isNaN(Number(fhHalfLongMiddle))) {
            validationArray.push("- Forehand recieves half long middle needs to be a number")
        }

        if (isNaN(Number(fhHalfLongBh))) {
            validationArray.push("- Forehand recieves half long backhand needs to be a number")
        }

        if (isNaN(Number(fhShortFh))) {
            validationArray.push("- Forehand recieves short forehand needs to be a number")
        }

        if (isNaN(Number(fhShortMiddle))) {
            validationArray.push("- Forehand recieves short middle needs to be a number")
        }

        if (isNaN(Number(fhShortBh))) {
            validationArray.push("- Forehand recieves short backhand needs to be a number")
        }

        if (!isNaN(Number(fhRecieves))) {
            if (Number(fhRecieves) != Number(fhLongFh) + Number(fhLongMiddle) + Number(fhLongBh) + Number(fhHalfLongFh) + Number(fhHalfLongMiddle) + Number(fhHalfLongBh) + Number(fhShortFh) + Number(fhShortMiddle) + Number(fhShortBh) && !isNaN(Number(fhLongFh)) && !isNaN(Number(fhLongMiddle)) && !isNaN(Number(fhLongBh)) && !isNaN(Number(fhHalfLongFh)) && !isNaN(Number(fhHalfLongMiddle)) && !isNaN(Number(fhHalfLongBh)) && !isNaN(Number(fhShortFh)) && !isNaN(Number(fhShortMiddle)) && !isNaN(Number(fhShortBh))) {
                validationArray.push(`- You need to distribute ${Number(fhRecieves) - (Number(fhLongFh) + Number(fhLongMiddle) + Number(fhLongBh) + Number(fhHalfLongFh) + Number(fhHalfLongMiddle) + Number(fhHalfLongBh) + Number(fhShortFh) + Number(fhShortMiddle) + Number(fhShortBh))} forehand recieves`)
            }
        }

        if (isNaN(Number(bhRecieves))) {
            validationArray.push("- Backhand recieves needs to be a number")
        }

        if (isNaN(Number(bhLongFh))) {
            validationArray.push("- Backhand recieves long forehand needs to be a number")
        }

        if (isNaN(Number(bhLongMiddle))) {
            validationArray.push("- Backhand recieves long middle needs to be a number")
        }

        if (isNaN(Number(bhLongBh))) {
            validationArray.push("- Backhand recieves long backhand needs to be a number")
        }

        if (isNaN(Number(bhHalfLongFh))) {
            validationArray.push("- Backhand recieves half long forehand needs to be a number")
        }

        if (isNaN(Number(bhHalfLongMiddle))) {
            validationArray.push("- Backhand recieves half long middle needs to be a number")
        }

        if (isNaN(Number(bhHalfLongBh))) {
            validationArray.push("- Backhand recieves half long backhand needs to be a number")
        }

        if (isNaN(Number(bhShortFh))) {
            validationArray.push("- Backhand recieves short forehand needs to be a number")
        }

        if (isNaN(Number(bhShortMiddle))) {
            validationArray.push("- Backhand recieves short middle needs to be a number")
        }

        if (isNaN(Number(bhShortBh))) {
            validationArray.push("- Backhand recieves short backhand needs to be a number")
        }

        if (!isNaN(Number(bhRecieves))) {
            if (Number(bhRecieves) != Number(bhLongFh) + Number(bhLongMiddle) + Number(bhLongBh) + Number(bhHalfLongFh) + Number(bhHalfLongMiddle) + Number(bhHalfLongBh) + Number(bhShortFh) + Number(bhShortMiddle) + Number(bhShortBh) && !isNaN(Number(bhLongFh)) && !isNaN(Number(bhLongMiddle)) && !isNaN(Number(bhLongBh)) && !isNaN(Number(bhHalfLongFh)) && !isNaN(Number(bhHalfLongMiddle)) && !isNaN(Number(bhHalfLongBh)) && !isNaN(Number(bhShortFh)) && !isNaN(Number(bhShortMiddle)) && !isNaN(Number(bhShortBh))) {
                validationArray.push(`- You need to distribute ${Number(bhRecieves) - (Number(bhLongFh) + Number(bhLongMiddle) + Number(bhLongBh) + Number(bhHalfLongFh) + Number(bhHalfLongMiddle) + Number(bhHalfLongBh) + Number(bhShortFh) + Number(bhShortMiddle) + Number(bhShortBh))} backhand recieves`)
            }
        }

        if (validationArray.length === 0) {

            const fhRecieves = {
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

            const bhRecieves = {
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

            dispatch(saveFhRecieves(fhRecieves))
            dispatch(saveBhRecieves(bhRecieves))

            router.push('/my-analyses/create/rallies')

        } else {
            setIsLoading(false)
            setValidation(true)
            setValidations(validationArray)
        }
    }

    return (
        <div className={styles.addRecieves}>
            <h1>Add recieves</h1>
            <RecievesForm
                buttonLabel='Next'
                fhRecievesValue={fhRecieves}
                onChangeFhRecieves={(e) => setFhRecieves(e.target.value)}
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
                bhRecievesValue={bhRecieves}
                onChangeBhRecieves={(e) => setBhRecieves(e.target.value)}
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
                onSubmit={addRecieves}
            />
        </div>
    )
}