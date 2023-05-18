import styles from '@/styles/pages/EditRecieves.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'
import RecievesForm from '@/components/forms/RecievesForm'

interface Context {
    params: { id: number}
}

export async function getServerSideProps(context: Context) {
    const id = context.params.id;
    const { data: analysis } = await supabase.from("analyses")
    .select(`
        id,
        recieves (
            forehandRecieves ( id, longFh, longMiddle, longBh, halfLongFh, halfLongMiddle, halfLongBh, shortFh, shortMiddle, shortBh )
        )
    `)
    .eq('id', id)
    .single()
    return {
        props: {
            analysis,
        },
    }
}

interface Analysis {
    id: number
    recieves: {
        forehandRecieves: {
            id: number;
            longFh: string;
            longMiddle: string;
            longBh: string;
            halfLongFh: string;
            halfLongMiddle: string;
            halfLongBh: string;
            shortFh: string;
            shortMiddle: string;
            shortBh: string;
        }
    }
}

interface EditBhRecievesProps {
    analysis: Analysis;
}

export default function EditForehandRecieves({ analysis }: EditBhRecievesProps) {

    let totalFhRecieves = Number(analysis.recieves.forehandRecieves.longFh) + Number(analysis.recieves.forehandRecieves.longMiddle) + Number(analysis.recieves.forehandRecieves.longBh) + Number(analysis.recieves.forehandRecieves.halfLongFh) + Number(analysis.recieves.forehandRecieves.halfLongMiddle) + Number(analysis.recieves.forehandRecieves.halfLongBh) + Number(analysis.recieves.forehandRecieves.shortFh) + Number(analysis.recieves.forehandRecieves.shortMiddle) + Number(analysis.recieves.forehandRecieves.shortBh)

    const [recieves, setRecieves] = useState(totalFhRecieves == 0 ? '' : totalFhRecieves.toString())
    const [longFh, setLongFh] = useState(analysis.recieves.forehandRecieves.longFh)
    const [longMiddle, setLongMiddle] = useState(analysis.recieves.forehandRecieves.longMiddle)
    const [longBh, setLongBh] = useState(analysis.recieves.forehandRecieves.longBh)
    const [halfLongFh, setHalfLongFh] = useState(analysis.recieves.forehandRecieves.halfLongFh)
    const [halfLongMiddle, setHalfLongMiddle] = useState(analysis.recieves.forehandRecieves.halfLongMiddle)
    const [halfLongBh, setHalfLongBh] = useState(analysis.recieves.forehandRecieves.halfLongBh)
    const [shortFh, setShortFh] = useState(analysis.recieves.forehandRecieves.shortFh)
    const [shortMiddle, setShortMiddle] = useState(analysis.recieves.forehandRecieves.shortMiddle)
    const [shortBh, setShortBh] = useState(analysis.recieves.forehandRecieves.longBh)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
    
    const router = useRouter()
    
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
            validationArray.push("- Forehand recieves long forehand needs to be a number")
        }

        if (isNaN(Number(halfLongFh))) {
            validationArray.push("- Forehand recieves half long forehand needs to be a number")
        }

        if (isNaN(Number(halfLongMiddle))) {
            validationArray.push("- Forehand recieves half long middle needs to be a number")
        }

        if (isNaN(Number(halfLongBh))) {
            validationArray.push("- Forehand recieves half long forehand needs to be a number")
        }

        if (isNaN(Number(shortFh))) {
            validationArray.push("- Forehand recieves short forehand needs to be a number")
        }

        if (isNaN(Number(shortMiddle))) {
            validationArray.push("- Forehand recieves short middle needs to be a number")
        }

        if (isNaN(Number(shortBh))) {
            validationArray.push("- Forehand recieves short forehand needs to be a number")
        }

        if (!isNaN(Number(recieves))) {
            if (Number(recieves) != Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh) && !isNaN(Number(longFh)) && !isNaN(Number(longMiddle)) && !isNaN(Number(longBh)) && !isNaN(Number(halfLongFh)) && !isNaN(Number(halfLongMiddle)) && !isNaN(Number(halfLongBh)) && !isNaN(Number(shortFh)) && !isNaN(Number(shortMiddle)) && !isNaN(Number(shortBh))) {
                validationArray.push(`- You need to distribute ${Number(recieves) - (Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh))} Forehand recieves`)
            }
        }

        if (validationArray.length === 0) {

            const { data, error } = await supabase
            .from('forehandRecieves')
            .update({
                longFh: longFh,
                longMiddle: longMiddle,
                longBh: longBh,
                halfLongFh: halfLongFh,
                halfLongMiddle: halfLongMiddle,
                halfLongBh: halfLongBh,
                shortFh: shortFh,
                shortMiddle: shortMiddle,
                shortBh: shortBh,
            }).eq('id', analysis.recieves.forehandRecieves.id).select('*')

            if (data) {
                router.push('/my-analyses/' + analysis.id)
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
        <div className={styles.editRecieves}>
            <h1>Edit forehand recieves</h1>
            <RecievesForm
                buttonLabel='Edit'
                recievesValue={recieves}
                onChangeRecieves={(e) => setRecieves(e.target.value)}
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
                onSubmit={addFhRecieves}
            />
        </div>
    )
}