import styles from '@/styles/components/forms/ForehandRecievesForm.module.css'
import { SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveFhRecievesId } from '@/features/recievesSlice'
import { useRouter } from 'next/router'
import { supabase } from '../../../supabase-client'
import TextField from '../TextField'
import Placements from '../Placements'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'

export default function ForehandRecievesForm() {

    const [recieves, setRecieves] = useState('')
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

    const router = useRouter();
    
    async function addFhRecieves(e: { preventDefault: () => void }) {
        e.preventDefault()

        
        let validationArray = [];

        if (isNaN(Number(recieves))) {
            validationArray.push("- Forehand recieves needs to be a number")
        }

        if (isNaN(Number(longFh))) {
            validationArray.push("- Forehand recieves long forehand needs to be a number")
        }

        if (isNaN(Number(longMiddle))) {
            validationArray.push("- Forehand recieves long middle needs to be a number")
        }

        if (isNaN(Number(longBh))) {
            validationArray.push("- Forehand recieves long backhand needs to be a number")
        }

        if (isNaN(Number(halfLongFh))) {
            validationArray.push("- Forehand recieves half long forehand needs to be a number")
        }

        if (isNaN(Number(halfLongMiddle))) {
            validationArray.push("- Forehand recieves half long middle needs to be a number")
        }

        if (isNaN(Number(halfLongBh))) {
            validationArray.push("- Forehand recieves half long backhand needs to be a number")
        }

        if (isNaN(Number(shortFh))) {
            validationArray.push("- Forehand recieves short forehand needs to be a number")
        }

        if (isNaN(Number(shortMiddle))) {
            validationArray.push("- Forehand recieves short middle needs to be a number")
        }

        if (isNaN(Number(shortBh))) {
            validationArray.push("- Forehand recieves short backhand needs to be a number")
        }

        if (!isNaN(Number(recieves))) {
            if (Number(recieves) != Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh) && !isNaN(Number(longFh)) && !isNaN(Number(longMiddle)) && !isNaN(Number(longBh)) && !isNaN(Number(halfLongFh)) && !isNaN(Number(halfLongMiddle)) && !isNaN(Number(halfLongBh)) && !isNaN(Number(shortFh)) && !isNaN(Number(shortMiddle)) && !isNaN(Number(shortBh))) {
                validationArray.push(`- You need to distribute ${Number(recieves) - (Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh))} forehand recieves`)
            }
        }

        if (validationArray.length === 0) {

            const { data, error } = await supabase
            .from('forehandRecieves')
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
                dispatch(saveFhRecievesId(data[0].id))
                router.push('/my-analyses/create/backhand-recieves')
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
    <form className={styles.forehandRecievesForm} onSubmit={addFhRecieves}>
        <TextField placeholder='Number of recieves' value={recieves} onChange={(e) => setRecieves(e.target.value)} />
        {recieves != '' && <Placements label='Distribute all recieves according to their placement:' longFhValue={longFh} longFhOnChange={(e: { target: { value: SetStateAction<string> } }) => setLongFh(e.target.value)} longMiddleValue={longMiddle} longMiddleOnChange={(e: { target: { value: SetStateAction<string> } }) => setLongMiddle(e.target.value)} longBhValue={longBh} longBhOnChange={(e: { target: { value: SetStateAction<string> } }) => setLongBh(e.target.value)} halfLongFhValue={halfLongFh} halfLongFhOnChange={(e: { target: { value: SetStateAction<string> } }) => setHalfLongFh(e.target.value)} halfLongMiddleValue={halfLongMiddle} halfLongMiddleOnChange={(e: { target: { value: SetStateAction<string> } }) => setHalfLongMiddle(e.target.value)} halfLongBhValue={halfLongBh} halfLongBhOnChange={(e: { target: { value: SetStateAction<string> } }) => setHalfLongBh(e.target.value)} shortFhValue={shortFh} shortFhOnChange={(e: { target: { value: SetStateAction<string> } }) => setShortFh(e.target.value)} shortMiddleValue={shortMiddle} shortMiddleOnChange={(e: { target: { value: SetStateAction<string> } }) => setShortMiddle(e.target.value)} shortBhValue={shortBh} shortBhOnChange={(e: { target: { value: SetStateAction<string> } }) => setShortBh(e.target.value)} />}
        <Button variant='primary' label='Next' />
        <Validation validation={validation} setValidation={setValidation} validations={validations} />
        <Error error={error} setError={setError} />
    </form>
  )
}