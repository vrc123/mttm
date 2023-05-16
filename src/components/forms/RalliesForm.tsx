import styles from '@/styles/components/forms/RalliesForm.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { useRouter } from 'next/router'
import { supabase } from '../../../supabase-client'
import TextField from '../TextField'
import Outcome from '../Outcome'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'
import { saveDate, saveOpponentId, saveRecievesId, saveScore, saveServesId } from '@/features/analysisSlice'

export default function RalliesForm() {

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

            const { data: rallies, error } = await supabase
            .from('rallies')
            .insert([{
                moreWins: moreWins,
                moreLoses: moreLoses,
                lessWins: lessWins,
                lessLoses: lessLoses,
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

        } else {
            setValidation(true)
            setValidations(validationArray)
        }
  }

  return (
    <form className={styles.ralliesForm} onSubmit={addRallies}>
        <p>Distribute the match rallies:</p>
        <TextField placeholder='More than 3 balls' value={more} onChange={(e) => setMore(e.target.value)} />
        <TextField placeholder='Less than 3 balls' value={less} onChange={(e) => setLess(e.target.value)} />
        {more != '' && <Outcome label='Distribute wins and loses for rallies more than 3 balls:' winsValue={moreWins} winsOnChange={(e) => setMoreWins(e.target.value)} losesValue={moreLoses} losesOnChange={(e) => setMoreLoses(e.target.value)} />}
        {less != '' && <Outcome label='Distribute wins and loses for rallies less than 3 balls:' winsValue={lessWins} winsOnChange={(e) => setLessWins(e.target.value)} losesValue={lessLoses} losesOnChange={(e) => setLessLoses(e.target.value)} />}
        <Button variant='primary' label='Next' />
        <Validation validation={validation} setValidation={setValidation} validations={validations} />
        <Error error={error} setError={setError} />
    </form>
  )
}