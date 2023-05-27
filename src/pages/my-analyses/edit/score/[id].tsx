import styles from '@/styles/pages/EditScore.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'
import ScoreForm from '@/components/forms/ScoreForm'
import Error from '@/components/Error'

interface Context {
    params: { id: number}
}

export async function getServerSideProps(context: Context) {
    const id = context.params.id;
    const { data: analysis } = await supabase.from("analyses")
    .select('id, score')
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
    score: string;
}

interface EditDateProps {
    analysis: Analysis;
}

export default function EditDate({ analysis }: EditDateProps) {

    let scoreArray = analysis.score.split('/')

    const [playerSets, setPlayerSets] = useState(scoreArray[0])
    const [opponentSets, setOpponentSets] = useState(scoreArray[1])
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)

    const router = useRouter();

    async function editScore(e: { preventDefault: () => void }) {
        e.preventDefault()

        let validationArray = []

        if (!playerSets) {
            validationArray.push("- Fill the player's sets field")
        }

        if (isNaN(Number(playerSets))) {
            validationArray.push("- Player's sets needs to be a number")
        }

        if (Number(playerSets) > 4) {
            validationArray.push("- The number of player's sets is set too high")
        }

        if (!opponentSets) {
            validationArray.push("- Fill the opponent's sets field")
        }

        if (isNaN(Number(opponentSets))) {
            validationArray.push("- Opponent's sets needs to be a number")
        }

        if (Number(opponentSets) > 4) {
            validationArray.push("- The number of opponent's sets is set too high")
        }

        if (Number(playerSets) == Number(opponentSets)) {
            validationArray.push("- The number of player's sets can't be equal to the number of opponent's sets")
        }

        if (validationArray.length === 0) {

            const { error } = await supabase
            .from('analyses')
            .update({
                score: playerSets + '/' + opponentSets
            }).eq('id', analysis.id)

            if (!error) {
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
        <div className={styles.editScore}>
            <h1>Edit score</h1>
            <ScoreForm
                buttonLabel='Edit'
                playerSetsValue={playerSets}
                opponentSetsValue={opponentSets}
                validationValue={validation}
                validationsValue={validations}
                onChangePlayerSets={(e) => setPlayerSets(e.target.value)}
                onChangeOpponentSets={(e) => setOpponentSets(e.target.value)}
                changeValidation={setValidation}
                onSubmit={editScore}
            />
            <Error error={error} setError={setError} />
        </div>
    )
}