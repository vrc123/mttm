import styles from '@/styles/components/forms/ScoreForm.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveScore } from '@/features/analysisSlice'
import { useRouter } from 'next/router'
import TextField from '../TextField'
import Button from '../Button'
import Validation from '../Validation'

export default function ScoreForm() {

    const [playerSets, setPlayerSets] = useState('')
    const [opponentSets, setOpponentSets] = useState('')
    const [validation, setValidation] = useState(false)
    const [validations, setValidations] = useState<string[]>([])

    const dispatch = useDispatch()

    const router = useRouter();

    function addScore(e: { preventDefault: () => void }) {
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
            dispatch(saveScore(playerSets + '/' + opponentSets))
            router.push('/my-analyses/create/forehand-serves')
        } else {
            setValidation(true)
            setValidations(validationArray)
        }
  }

  return (
    <form className={styles.scoreForm} onSubmit={addScore}>
      <p>Type the score of the match:</p>
      <TextField placeholder='Player sets' value={playerSets} onChange={(e) => setPlayerSets(e.target.value)} />
      <TextField placeholder='Opponent sets' value={opponentSets} onChange={(e) => setOpponentSets(e.target.value)} />
      <Button variant='primary' label='Next' />
      <Validation validation={validation} setValidation={setValidation} validations={validations} />
    </form>
  )
}