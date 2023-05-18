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
            backhandRecieves ( id, longFh, longMiddle, longBh, halfLongFh, halfLongMiddle, halfLongBh, shortFh, shortMiddle, shortBh )
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
        backhandRecieves: {
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

export default function EditBackhandRecieves({ analysis }: EditBhRecievesProps) {

    let totalBhRecieves = Number(analysis.recieves.backhandRecieves.longFh) + Number(analysis.recieves.backhandRecieves.longMiddle) + Number(analysis.recieves.backhandRecieves.longBh) + Number(analysis.recieves.backhandRecieves.halfLongFh) + Number(analysis.recieves.backhandRecieves.halfLongMiddle) + Number(analysis.recieves.backhandRecieves.halfLongBh) + Number(analysis.recieves.backhandRecieves.shortFh) + Number(analysis.recieves.backhandRecieves.shortMiddle) + Number(analysis.recieves.backhandRecieves.shortBh)

    const [recieves, setRecieves] = useState(totalBhRecieves == 0 ? '' : totalBhRecieves.toString())
    const [longFh, setLongFh] = useState(analysis.recieves.backhandRecieves.longFh)
    const [longMiddle, setLongMiddle] = useState(analysis.recieves.backhandRecieves.longMiddle)
    const [longBh, setLongBh] = useState(analysis.recieves.backhandRecieves.longBh)
    const [halfLongFh, setHalfLongFh] = useState(analysis.recieves.backhandRecieves.halfLongFh)
    const [halfLongMiddle, setHalfLongMiddle] = useState(analysis.recieves.backhandRecieves.halfLongMiddle)
    const [halfLongBh, setHalfLongBh] = useState(analysis.recieves.backhandRecieves.halfLongBh)
    const [shortFh, setShortFh] = useState(analysis.recieves.backhandRecieves.shortFh)
    const [shortMiddle, setShortMiddle] = useState(analysis.recieves.backhandRecieves.shortMiddle)
    const [shortBh, setShortBh] = useState(analysis.recieves.backhandRecieves.longBh)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
    
    const router = useRouter()
    
    async function addBhRecieves(e: { preventDefault: () => void }) {
        e.preventDefault()

        let validationArray = [];

        if (isNaN(Number(recieves))) {
            validationArray.push("- Backhand recieves needs to be a number")
        }

        if (isNaN(Number(longFh))) {
            validationArray.push("- Backhand recieves long backhand needs to be a number")
        }

        if (isNaN(Number(longMiddle))) {
            validationArray.push("- Backhand recieves long middle needs to be a number")
        }

        if (isNaN(Number(longBh))) {
            validationArray.push("- Backhand recieves long backhand needs to be a number")
        }

        if (isNaN(Number(halfLongFh))) {
            validationArray.push("- Backhand recieves half long backhand needs to be a number")
        }

        if (isNaN(Number(halfLongMiddle))) {
            validationArray.push("- Backhand recieves half long middle needs to be a number")
        }

        if (isNaN(Number(halfLongBh))) {
            validationArray.push("- Backhand recieves half long backhand needs to be a number")
        }

        if (isNaN(Number(shortFh))) {
            validationArray.push("- Backhand recieves short backhand needs to be a number")
        }

        if (isNaN(Number(shortMiddle))) {
            validationArray.push("- Backhand recieves short middle needs to be a number")
        }

        if (isNaN(Number(shortBh))) {
            validationArray.push("- Backhand recieves short backhand needs to be a number")
        }

        if (!isNaN(Number(recieves))) {
            if (Number(recieves) != Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh) && !isNaN(Number(longFh)) && !isNaN(Number(longMiddle)) && !isNaN(Number(longBh)) && !isNaN(Number(halfLongFh)) && !isNaN(Number(halfLongMiddle)) && !isNaN(Number(halfLongBh)) && !isNaN(Number(shortFh)) && !isNaN(Number(shortMiddle)) && !isNaN(Number(shortBh))) {
                validationArray.push(`- You need to distribute ${Number(recieves) - (Number(longFh) + Number(longMiddle) + Number(longBh) + Number(halfLongFh) + Number(halfLongMiddle) + Number(halfLongBh) + Number(shortFh) + Number(shortMiddle) + Number(shortBh))} Backhand recieves`)
            }
        }

        if (validationArray.length === 0) {

            const { data, error } = await supabase
            .from('backhandRecieves')
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
            }).eq('id', analysis.recieves.backhandRecieves.id).select('*')

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
            <h1>Edit backhand recieves</h1>
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
                onSubmit={addBhRecieves}
            />
        </div>
    )
}