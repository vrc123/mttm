import styles from '@/styles/pages/EditServes.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'
import ServesForm from '@/components/forms/ServesForm'

interface Context {
    params: { id: number}
}

export async function getServerSideProps(context: Context) {
    const id = context.params.id;
    const { data: analysis } = await supabase.from("analyses")
    .select(`
        id,
        serves (
            backhandServes ( id, longFh, longMiddle, longBh, halfLongFh, halfLongMiddle, halfLongBh, shortFh, shortMiddle, shortBh )
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
    serves: {
        backhandServes: {
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

interface EditBhServesProps {
    analysis: Analysis;
}

export default function EditBackhandServes({ analysis }: EditBhServesProps) {

    let totalBhServes = Number(analysis.serves.backhandServes.longFh) + Number(analysis.serves.backhandServes.longMiddle) + Number(analysis.serves.backhandServes.longBh) + Number(analysis.serves.backhandServes.halfLongFh) + Number(analysis.serves.backhandServes.halfLongMiddle) + Number(analysis.serves.backhandServes.halfLongBh) + Number(analysis.serves.backhandServes.shortFh) + Number(analysis.serves.backhandServes.shortMiddle) + Number(analysis.serves.backhandServes.shortBh)

    const [serves, setServes] = useState(totalBhServes == 0 ? '' : totalBhServes.toString())
    const [longFh, setLongFh] = useState(analysis.serves.backhandServes.longFh)
    const [longMiddle, setLongMiddle] = useState(analysis.serves.backhandServes.longMiddle)
    const [longBh, setLongBh] = useState(analysis.serves.backhandServes.longBh)
    const [halfLongFh, setHalfLongFh] = useState(analysis.serves.backhandServes.halfLongFh)
    const [halfLongMiddle, setHalfLongMiddle] = useState(analysis.serves.backhandServes.halfLongMiddle)
    const [halfLongBh, setHalfLongBh] = useState(analysis.serves.backhandServes.halfLongBh)
    const [shortFh, setShortFh] = useState(analysis.serves.backhandServes.shortFh)
    const [shortMiddle, setShortMiddle] = useState(analysis.serves.backhandServes.shortMiddle)
    const [shortBh, setShortBh] = useState(analysis.serves.backhandServes.longBh)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
    
    const router = useRouter()
    
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

            const { data, error } = await supabase
            .from('backhandServes')
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
            }).eq('id', analysis.serves.backhandServes.id).select('*')

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
        <div className={styles.editServes}>
            <h1>Edit backhand serves</h1>
            <ServesForm
                buttonLabel='Edit'
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
                onSubmit={addBhServes}
            />
        </div>
    )
}