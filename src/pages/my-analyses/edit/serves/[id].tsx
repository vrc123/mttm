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
            forehandServes ( id, longFh, longMiddle, longBh, halfLongFh, halfLongMiddle, halfLongBh, shortFh, shortMiddle, shortBh ),
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
        forehandServes: {
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

interface EditServesProps {
    analysis: Analysis;
}

export default function EditForehandServes({ analysis }: EditServesProps) {

    let totalFhServes = Number(analysis.serves.forehandServes.longFh) + Number(analysis.serves.forehandServes.longMiddle) + Number(analysis.serves.forehandServes.longBh) + Number(analysis.serves.forehandServes.halfLongFh) + Number(analysis.serves.forehandServes.halfLongMiddle) + Number(analysis.serves.forehandServes.halfLongBh) + Number(analysis.serves.forehandServes.shortFh) + Number(analysis.serves.forehandServes.shortMiddle) + Number(analysis.serves.forehandServes.shortBh)
    let totalBhServes = Number(analysis.serves.backhandServes.longFh) + Number(analysis.serves.backhandServes.longMiddle) + Number(analysis.serves.backhandServes.longBh) + Number(analysis.serves.backhandServes.halfLongFh) + Number(analysis.serves.backhandServes.halfLongMiddle) + Number(analysis.serves.backhandServes.halfLongBh) + Number(analysis.serves.backhandServes.shortFh) + Number(analysis.serves.backhandServes.shortMiddle) + Number(analysis.serves.backhandServes.shortBh)

    const [fhServes, setFhServes] = useState(totalFhServes == 0 ? '' : totalFhServes.toString())
    const [bhServes, setBhServes] = useState(totalBhServes == 0 ? '' : totalBhServes.toString())
    const [fhLongFh, setFhLongFh] = useState(analysis.serves.forehandServes.longFh)
    const [fhLongMiddle, setFhLongMiddle] = useState(analysis.serves.forehandServes.longMiddle)
    const [fhLongBh, setFhLongBh] = useState(analysis.serves.forehandServes.longBh)
    const [fhHalfLongFh, setFhHalfLongFh] = useState(analysis.serves.forehandServes.halfLongFh)
    const [fhHalfLongMiddle, setFhHalfLongMiddle] = useState(analysis.serves.forehandServes.halfLongMiddle)
    const [fhHalfLongBh, setFhHalfLongBh] = useState(analysis.serves.forehandServes.halfLongBh)
    const [fhShortFh, setFhShortFh] = useState(analysis.serves.forehandServes.shortFh)
    const [fhShortMiddle, setFhShortMiddle] = useState(analysis.serves.forehandServes.shortMiddle)
    const [fhShortBh, setFhShortBh] = useState(analysis.serves.forehandServes.shortBh)
    const [bhLongFh, setBhLongFh] = useState(analysis.serves.backhandServes.longFh)
    const [bhLongMiddle, setBhLongMiddle] = useState(analysis.serves.backhandServes.longMiddle)
    const [bhLongBh, setBhLongBh] = useState(analysis.serves.backhandServes.longBh)
    const [bhHalfLongFh, setBhHalfLongFh] = useState(analysis.serves.backhandServes.halfLongFh)
    const [bhHalfLongMiddle, setBhHalfLongMiddle] = useState(analysis.serves.backhandServes.halfLongMiddle)
    const [bhHalfLongBh, setBhHalfLongBh] = useState(analysis.serves.backhandServes.halfLongBh)
    const [bhShortFh, setBhShortFh] = useState(analysis.serves.backhandServes.shortFh)
    const [bhShortMiddle, setBhShortMiddle] = useState(analysis.serves.backhandServes.longMiddle)
    const [bhShortBh, setBhShortBh] = useState(analysis.serves.backhandServes.longBh)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const router = useRouter()
    
    async function editServes(e: { preventDefault: () => void }) {
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

            const { error: fhError } = await supabase
            .from('forehandServes')
            .update({
                longFh: fhLongFh,
                longMiddle: fhLongMiddle,
                longBh: fhLongBh,
                halfLongFh: fhHalfLongFh,
                halfLongMiddle: fhHalfLongMiddle,
                halfLongBh: fhHalfLongBh,
                shortFh: fhShortFh,
                shortMiddle: fhShortMiddle,
                shortBh: fhShortBh,
            }).eq('id', analysis.serves.forehandServes.id)

            const { error: bhError } = await supabase
            .from('backhandServes')
            .update({
                longFh: bhLongFh,
                longMiddle: bhLongMiddle,
                longBh: bhLongBh,
                halfLongFh: bhHalfLongFh,
                halfLongMiddle: bhHalfLongMiddle,
                halfLongBh: bhHalfLongBh,
                shortFh: bhShortFh,
                shortMiddle: bhShortMiddle,
                shortBh: bhShortBh,
            }).eq('id', analysis.serves.backhandServes.id)

            if (!fhError && !bhError) {
                router.push('/my-analyses/' + analysis.id)
            }

            if (fhError || bhError) {
                setIsLoading(false)
                setError(true)
            }
            
        } else {
            setIsLoading(false)
            setValidation(true)
            setValidations(validationArray)
        }
    }

    return (
        <div className={styles.editServes}>
            <h1>Edit serves</h1>
            <ServesForm
                buttonLabel='Edit'
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
                onSubmit={editServes}
            />
        </div>
    )
}