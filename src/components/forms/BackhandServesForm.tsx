import styles from '@/styles/components/forms/BackhandServesForm.module.css'
import { SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { saveServesId } from '@/features/analysisSlice'
import { useRouter } from 'next/router'
import { supabase } from '../../../supabase-client'
import TextField from '../TextField'
import Placements from '../Placements'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'

export default function BackhandServesForm() {

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

    const fhServesId = useSelector((state: RootState) => state.serves.fhServesId)

    const router = useRouter();
    
    async function addBhServes(e: { preventDefault: () => void }) {
        e.preventDefault()

        
        let validationArray = [];

        if (isNaN(Number(serves))) {
            validationArray.push("- Backhand serves needs to be a number")
        }

        if (isNaN(Number(longFh))) {
            validationArray.push("- Backhand serves long forehand needs to be a number")
        }

        if (isNaN(Number(longMiddle))) {
            validationArray.push("- Backhand serves long middle needs to be a number")
        }

        if (isNaN(Number(longBh))) {
            validationArray.push("- Backhand serves long backhand needs to be a number")
        }

        if (isNaN(Number(halfLongFh))) {
            validationArray.push("- Backhand serves half long forehand needs to be a number")
        }

        if (isNaN(Number(halfLongMiddle))) {
            validationArray.push("- Backhand serves half long middle needs to be a number")
        }

        if (isNaN(Number(halfLongBh))) {
            validationArray.push("- Backhand serves half long backhand needs to be a number")
        }

        if (isNaN(Number(shortFh))) {
            validationArray.push("- Backhand serves short forehand needs to be a number")
        }

        if (isNaN(Number(shortMiddle))) {
            validationArray.push("- Backhand serves short middle needs to be a number")
        }

        if (isNaN(Number(shortBh))) {
            validationArray.push("- Backhand serves short backhand needs to be a number")
        }

        if (!isNaN(Number(serves))) {
            if (Number(serves) != Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh) && !isNaN(Number(longFh)) && !isNaN(Number(longMiddle)) && !isNaN(Number(longBh)) && !isNaN(Number(halfLongFh)) && !isNaN(Number(halfLongMiddle)) && !isNaN(Number(halfLongBh)) && !isNaN(Number(shortFh)) && !isNaN(Number(shortMiddle)) && !isNaN(Number(shortBh))) {
                validationArray.push(`- You need to distribute ${Number(serves) - (Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh))} backhand serves`)
            }
        }

        if (validationArray.length === 0) {

            const { data: bhServes, error } = await supabase
            .from('backhandServes')
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

            if (bhServes) {

                const { data: serves, error } = await supabase
                .from('serves')
                .insert([{
                    fhServesId: fhServesId,
                    bhServesId: bhServes[0].id,
                }]).select('*')

                if (serves) {
                    dispatch(saveServesId(serves[0].id))
                    router.push('/my-analyses/create/forehand-recieves')
                }

                if (error) {
                    setError(true)
                }
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
    <form className={styles.backhandServesForm} onSubmit={addBhServes}>
        <TextField placeholder='Number of serves' value={serves} onChange={(e) => setServes(e.target.value)} />
        {serves != '' && <Placements label='Distribute all serves according to their placement:' longFhValue={longFh} longFhOnChange={(e: { target: { value: SetStateAction<string> } }) => setLongFh(e.target.value)} longMiddleValue={longMiddle} longMiddleOnChange={(e: { target: { value: SetStateAction<string> } }) => setLongMiddle(e.target.value)} longBhValue={longBh} longBhOnChange={(e: { target: { value: SetStateAction<string> } }) => setLongBh(e.target.value)} halfLongFhValue={halfLongFh} halfLongFhOnChange={(e: { target: { value: SetStateAction<string> } }) => setHalfLongFh(e.target.value)} halfLongMiddleValue={halfLongMiddle} halfLongMiddleOnChange={(e: { target: { value: SetStateAction<string> } }) => setHalfLongMiddle(e.target.value)} halfLongBhValue={halfLongBh} halfLongBhOnChange={(e: { target: { value: SetStateAction<string> } }) => setHalfLongBh(e.target.value)} shortFhValue={shortFh} shortFhOnChange={(e: { target: { value: SetStateAction<string> } }) => setShortFh(e.target.value)} shortMiddleValue={shortMiddle} shortMiddleOnChange={(e: { target: { value: SetStateAction<string> } }) => setShortMiddle(e.target.value)} shortBhValue={shortBh} shortBhOnChange={(e: { target: { value: SetStateAction<string> } }) => setShortBh(e.target.value)} />}
        <Button variant='primary' label='Next' />
        <Validation validation={validation} setValidation={setValidation} validations={validations} />
        <Error error={error} setError={setError} />
    </form>
  )
}