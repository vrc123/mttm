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
            forehandRecieves ( id, longFh, longMiddle, longBh, halfLongFh, halfLongMiddle, halfLongBh, shortFh, shortMiddle, shortBh ),
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
        },
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

interface EditRecievesProps {
    analysis: Analysis;
}

export default function EditRecieves({ analysis }: EditRecievesProps) {
    
    let totalFhRecieves = Number(analysis.recieves.forehandRecieves.longFh) + Number(analysis.recieves.forehandRecieves.longMiddle) + Number(analysis.recieves.forehandRecieves.longBh) + Number(analysis.recieves.forehandRecieves.halfLongFh) + Number(analysis.recieves.forehandRecieves.halfLongMiddle) + Number(analysis.recieves.forehandRecieves.halfLongBh) + Number(analysis.recieves.forehandRecieves.shortFh) + Number(analysis.recieves.forehandRecieves.shortMiddle) + Number(analysis.recieves.forehandRecieves.shortBh)
    let totalBhRecieves = Number(analysis.recieves.backhandRecieves.longFh) + Number(analysis.recieves.backhandRecieves.longMiddle) + Number(analysis.recieves.backhandRecieves.longBh) + Number(analysis.recieves.backhandRecieves.halfLongFh) + Number(analysis.recieves.backhandRecieves.halfLongMiddle) + Number(analysis.recieves.backhandRecieves.halfLongBh) + Number(analysis.recieves.backhandRecieves.shortFh) + Number(analysis.recieves.backhandRecieves.shortMiddle) + Number(analysis.recieves.backhandRecieves.shortBh)
    
    const [fhRecieves, setFhRecieves] = useState(totalFhRecieves == 0 ? '' : totalFhRecieves.toString())
    const [bhRecieves, setBhRecieves] = useState(totalBhRecieves == 0 ? '' : totalBhRecieves.toString())
    const [fhLongFh, setFhLongFh] = useState(analysis.recieves.forehandRecieves.longFh)
    const [fhLongMiddle, setFhLongMiddle] = useState(analysis.recieves.forehandRecieves.longMiddle)
    const [fhLongBh, setFhLongBh] = useState(analysis.recieves.forehandRecieves.longBh)
    const [fhHalfLongFh, setFhHalfLongFh] = useState(analysis.recieves.forehandRecieves.halfLongFh)
    const [fhHalfLongMiddle, setFhHalfLongMiddle] = useState(analysis.recieves.forehandRecieves.halfLongMiddle)
    const [fhHalfLongBh, setFhHalfLongBh] = useState(analysis.recieves.forehandRecieves.halfLongBh)
    const [fhShortFh, setFhShortFh] = useState(analysis.recieves.forehandRecieves.shortFh)
    const [fhShortMiddle, setFhShortMiddle] = useState(analysis.recieves.forehandRecieves.shortMiddle)
    const [fhShortBh, setFhShortBh] = useState(analysis.recieves.forehandRecieves.shortBh)
    const [bhLongFh, setBhLongFh] = useState(analysis.recieves.backhandRecieves.longFh)
    const [bhLongMiddle, setBhLongMiddle] = useState(analysis.recieves.backhandRecieves.longMiddle)
    const [bhLongBh, setBhLongBh] = useState(analysis.recieves.backhandRecieves.longBh)
    const [bhHalfLongFh, setBhHalfLongFh] = useState(analysis.recieves.backhandRecieves.halfLongFh)
    const [bhHalfLongMiddle, setBhHalfLongMiddle] = useState(analysis.recieves.backhandRecieves.halfLongMiddle)
    const [bhHalfLongBh, setBhHalfLongBh] = useState(analysis.recieves.backhandRecieves.halfLongBh)
    const [bhShortFh, setBhShortFh] = useState(analysis.recieves.backhandRecieves.shortFh)
    const [bhShortMiddle, setBhShortMiddle] = useState(analysis.recieves.backhandRecieves.shortMiddle)
    const [bhShortBh, setBhShortBh] = useState(analysis.recieves.backhandRecieves.shortBh)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
    
    const router = useRouter()
    
    async function editRecieves(e: { preventDefault: () => void }) {
        e.preventDefault()

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

            const { error: fhError } = await supabase
            .from('forehandRecieves')
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
            }).eq('id', analysis.recieves.forehandRecieves.id)

            const { error: bhError } = await supabase
            .from('backhandRecieves')
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
            }).eq('id', analysis.recieves.backhandRecieves.id)

            if (!fhError && !bhError) {
                router.push('/my-analyses/' + analysis.id)
            }

            if (fhError || bhError) {
                setError(true)
            }
            
        } else {
            setValidation(true)
            setValidations(validationArray)
        }
    }

    return (
        <div className={styles.editRecieves}>
            <h1>Edit recieves</h1>
            <RecievesForm
                buttonLabel='Edit'
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
                changeValidation={setValidation}
                changeError={setError}
                onSubmit={editRecieves}
            />
        </div>
    )
}