import styles from '@/styles/components/forms/BackhandRecievesForm.module.css'
import { SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveRecievesId } from '@/features/analysisSlice'
import { useRouter } from 'next/router'
import { supabase } from '../../../supabase-client'
import TextField from '../TextField'
import Placements from '../Placements'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'
import { RootState } from '../../../store'

export default function BackhandRecievesForm() {

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

    const fhRecievesId = useSelector((state: RootState) => state.recieves.fhRecievesId)

    const router = useRouter();
    
    async function addBhRecieves(e: { preventDefault: () => void }) {
        e.preventDefault()
        
        let validationArray = [];

        if (isNaN(Number(recieves))) {
            validationArray.push("- Backhand recieves needs to be a number")
        }

        if (isNaN(Number(longFh))) {
            validationArray.push("- Backhand recieves long forehand needs to be a number")
        }

        if (isNaN(Number(longMiddle))) {
            validationArray.push("- Backhand recieves long middle needs to be a number")
        }

        if (isNaN(Number(longBh))) {
            validationArray.push("- Backhand recieves long backhand needs to be a number")
        }

        if (isNaN(Number(halfLongFh))) {
            validationArray.push("- Backhand recieves half long forehand needs to be a number")
        }

        if (isNaN(Number(halfLongMiddle))) {
            validationArray.push("- Backhand recieves half long middle needs to be a number")
        }

        if (isNaN(Number(halfLongBh))) {
            validationArray.push("- Backhand recieves half long backhand needs to be a number")
        }

        if (isNaN(Number(shortFh))) {
            validationArray.push("- Backhand recieves short forehand needs to be a number")
        }

        if (isNaN(Number(shortMiddle))) {
            validationArray.push("- Backhand recieves short middle needs to be a number")
        }

        if (isNaN(Number(shortBh))) {
            validationArray.push("- Backhand recieves short backhand needs to be a number")
        }

        if (!isNaN(Number(recieves))) {
            if (Number(recieves) != Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh) && !isNaN(Number(longFh)) && !isNaN(Number(longMiddle)) && !isNaN(Number(longBh)) && !isNaN(Number(halfLongFh)) && !isNaN(Number(halfLongMiddle)) && !isNaN(Number(halfLongBh)) && !isNaN(Number(shortFh)) && !isNaN(Number(shortMiddle)) && !isNaN(Number(shortBh))) {
                validationArray.push(`- You need to distribute ${Number(recieves) - (Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh))} backhand recieves`)
            }
        }

        if (validationArray.length === 0) {

            const { data: bhRecives, error } = await supabase
            .from('backhandRecieves')
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

            if (bhRecives) {

                const { data: recieves, error } = await supabase
                .from('recieves')
                .insert([{
                    fhRecievesId: fhRecievesId,
                    bhRecievesId: bhRecives[0].id,
                }]).select('*')

                if (recieves) {
                    dispatch(saveRecievesId(recieves[0].id))
                    router.push('/my-analyses/create/rallies')
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
    <form className={styles.backhandRecievesForm} onSubmit={addBhRecieves}>
        <TextField placeholder='Number of recieves' value={recieves} onChange={(e) => setRecieves(e.target.value)} />
        {recieves != '' && <Placements label='Distribute all recieves according to their placement:' longFhValue={longFh} longFhOnChange={(e: { target: { value: SetStateAction<string> } }) => setLongFh(e.target.value)} longMiddleValue={longMiddle} longMiddleOnChange={(e: { target: { value: SetStateAction<string> } }) => setLongMiddle(e.target.value)} longBhValue={longBh} longBhOnChange={(e: { target: { value: SetStateAction<string> } }) => setLongBh(e.target.value)} halfLongFhValue={halfLongFh} halfLongFhOnChange={(e: { target: { value: SetStateAction<string> } }) => setHalfLongFh(e.target.value)} halfLongMiddleValue={halfLongMiddle} halfLongMiddleOnChange={(e: { target: { value: SetStateAction<string> } }) => setHalfLongMiddle(e.target.value)} halfLongBhValue={halfLongBh} halfLongBhOnChange={(e: { target: { value: SetStateAction<string> } }) => setHalfLongBh(e.target.value)} shortFhValue={shortFh} shortFhOnChange={(e: { target: { value: SetStateAction<string> } }) => setShortFh(e.target.value)} shortMiddleValue={shortMiddle} shortMiddleOnChange={(e: { target: { value: SetStateAction<string> } }) => setShortMiddle(e.target.value)} shortBhValue={shortBh} shortBhOnChange={(e: { target: { value: SetStateAction<string> } }) => setShortBh(e.target.value)} />}
        <Button variant='primary' label='Next' />
        <Validation validation={validation} setValidation={setValidation} validations={validations} />
        <Error error={error} setError={setError} />
    </form>
  )
}