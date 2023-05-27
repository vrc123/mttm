import styles from '@/styles/pages/EditRallies.module.css'
import RalliesForm from '@/components/forms/RalliesForm'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'

interface Context {
    params: { id: number}
}

export async function getServerSideProps(context: Context) {
    const id = context.params.id;
    const { data: analysis } = await supabase.from("analyses")
    .select(`
        id,
        rallies ( 
            id,
            ralliesMore ( id, wins, loses ),
            ralliesLess ( id, wins, loses )
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
    id: number;
    rallies: {
        id: number;
        ralliesMore: {
            id: number;
            wins: string;
            loses: string;
        }
        ralliesLess: {
            id: number;
            wins: string;
            loses: string;
        }
    }
}

interface EditRalliesProps {
    analysis: Analysis;
}

export default function EditRallies({ analysis }: EditRalliesProps) {

    let totalMoreRallies = Number(analysis.rallies.ralliesMore.wins) + Number(analysis.rallies.ralliesMore.loses)
    let totalLessRallies = Number(analysis.rallies.ralliesLess.wins) + Number(analysis.rallies.ralliesLess.loses)

    const [more, setMore] = useState(totalMoreRallies == 0 ? '' : totalMoreRallies.toString())
    const [less, setLess] = useState(totalLessRallies == 0 ? '' : totalLessRallies.toString())
    const [moreWins, setMoreWins] = useState(analysis.rallies.ralliesMore.wins)
    const [moreLoses, setMoreLoses] = useState(analysis.rallies.ralliesMore.loses)
    const [lessWins, setLessWins] = useState(analysis.rallies.ralliesLess.wins)
    const [lessLoses, setLessLoses] = useState(analysis.rallies.ralliesLess.loses)
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    
    async function EditRallies(e: { preventDefault: () => void }) {
        e.preventDefault()

        setIsLoading(true)

        let validationArray = []

        if (isNaN(Number(more))) {
            validationArray.push('- More needs to be a number')
        }

        if (isNaN(Number(moreWins))) {
            validationArray.push('- Wins needs to be a number (more)')
        }

        if (isNaN(Number(moreLoses))) {
            validationArray.push('- Loses needs to be a number (more)')
        }

        if (Number(more) != Number(moreWins) + Number(moreLoses) && !isNaN(Number(moreWins)) && !isNaN(Number(moreLoses))) {
            validationArray.push(`- You need to distribute ${Number(more) - (Number(moreWins) + Number(moreLoses))} rallies (more)`)
        }

        if (isNaN(Number(less))) {
            validationArray.push('- Less needs to be a number')
        }

        if (isNaN(Number(lessWins))) {
            validationArray.push('- Wins needs to be a number (less)')
        }

        if (isNaN(Number(lessLoses))) {
            validationArray.push('- Loses needs to be a number (less)')
        }

        if (Number(less) != Number(lessWins) + Number(lessLoses) && !isNaN(Number(lessWins)) && !isNaN(Number(lessLoses))) {
            validationArray.push(`- You need to distribute ${Number(less) - (Number(lessWins) + Number(lessLoses))} rallies (less)`)
        }

        if (validationArray.length === 0) {

            const { error: moreError } = await supabase
            .from('ralliesMore')
            .update({
                wins: moreWins,
                loses: moreLoses,
            }).eq('id', analysis.rallies.ralliesMore.id)

            const { error: lessError } = await supabase
            .from('ralliesLess')
            .update({
                wins: lessWins,
                loses: lessLoses,
            }).eq('id', analysis.rallies.ralliesLess.id)

            if (!moreError && !lessError) {
                router.push('/my-analyses/' + analysis.id)
            }

            if (moreError || lessError) {
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
        <div className={styles.editRallies} >
            <h1>Add match rallies</h1>
            <RalliesForm
                buttonLabel='Edit'
                moreValue={more}
                onChangeMore={(e) => setMore(e.target.value)}
                lessValue={less}
                onChangeLess={(e) => setLess(e.target.value)}
                moreWinsValue={moreWins}
                onChangeMoreWins={(e) => setMoreWins(e.target.value)}
                moreLosesValue={moreLoses}
                onChangeMoreLoses={(e) => setMoreLoses(e.target.value)}
                lessWinsValue={lessWins}
                onChangeLessWins={(e) => setLessWins(e.target.value)}
                lessLosesValue={lessLoses}
                onChangeLessLoses={(e) => setLessLoses(e.target.value)}
                validationValue={validation}
                validationsValue={validations}
                errorValue={error}
                isLoadingValue={isLoading}
                changeValidation={setValidation}
                changeError={setError}
                onSubmit={EditRallies}
            />
        </div>
    )
}