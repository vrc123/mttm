import styles from '@/styles/pages/AddRallies.module.css'
import RalliesForm from '@/components/forms/RalliesForm'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../store'
import { saveDate, saveOpponentId, saveRecievesId, saveScore, saveServesId } from '@/features/analysisSlice'
import { useRouter } from 'next/router'
import { supabase } from '../../../../../supabase-client'

export default function AddRallies() {

    const [more, setMore] = useState('')
    const [moreWins, setMoreWins] = useState('')
    const [moreLoses, setMoreLoses] = useState('')
    const [less, setLess] = useState('')
    const [lessWins, setLessWins] = useState('')
    const [lessLoses, setLessLoses] = useState('')
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])
    const [error, setError] = useState(false)

    const analysis = useSelector((state: RootState) => state.analysis)

    const dispatch = useDispatch()

    const router = useRouter()
    
    async function addRallies(e: { preventDefault: () => void }) {
        e.preventDefault()

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

            const { data: ralliesMore, error } = await supabase
            .from('ralliesMore')
            .insert([{
                wins: moreWins,
                loses: moreLoses,
            }]).select('*')

            if (ralliesMore) {
                
                const { data: ralliesLess, error } = await supabase
                .from('ralliesLess')
                .insert([{
                    wins: lessWins,
                    loses: lessLoses,
                }]).select('*')

                if (ralliesLess) {

                    const { data: rallies, error } = await supabase
                    .from('rallies')
                    .insert([{
                        ralliesMoreId: ralliesMore[0].id,
                        ralliesLessId: ralliesLess[0].id,
                    }]).select('*')

                    if (rallies) {

                        const { data: analyses, error } = await supabase
                        .from('analyses')
                        .insert([{
                            date: analysis.date,
                            opponentId: analysis.opponentId,
                            score: analysis.score,
                            servesId: analysis.servesId,
                            recievesId: analysis.recievesId,
                            ralliesId: rallies[0].id,
                        }]).select('*')

                        if (analyses) {
                            dispatch(saveDate(''))
                            dispatch(saveOpponentId(0))
                            dispatch(saveScore(''))
                            dispatch(saveServesId(0))
                            dispatch(saveRecievesId(0))
                            
                            router.push('/my-analyses')
                        }

                        if (error) {
                            setError(true)
                        }
                    }

                    if (error) {
                        setError(true)
                    }
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
        <div className={styles.addRallies} >
            <h1>Add match rallies</h1>
            <RalliesForm
                buttonLabel='Create analysis'
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
                changeValidation={setValidation}
                changeError={setError}
                onSubmit={addRallies}
            />
        </div>
    )
}