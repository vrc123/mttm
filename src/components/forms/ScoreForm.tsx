import styles from '@/styles/components/forms/ScoreForm.module.css'
import TextField from '../TextField'
import Button from '../Button'
import Validation from '../Validation'

interface ScoreFormProps {
  buttonLabel: string;
  playerSetsValue: string;
  opponentSetsValue: string;
  validationValue: boolean;
  validationsValue: string[];
  onChangePlayerSets: React.ChangeEventHandler<HTMLInputElement>;
  onChangeOpponentSets: React.ChangeEventHandler<HTMLInputElement>;
  changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}  

export default function ScoreForm({ buttonLabel, playerSetsValue, opponentSetsValue, validationValue, validationsValue, onChangePlayerSets, onChangeOpponentSets, changeValidation, onSubmit }: ScoreFormProps) {

  return (
    <form className={styles.scoreForm} onSubmit={onSubmit}>
      <p>Type the score of the match:</p>
      <TextField placeholder='Player sets' value={playerSetsValue} onChange={onChangePlayerSets} />
      <TextField placeholder='Opponent sets' value={opponentSetsValue} onChange={onChangeOpponentSets} />
      <Button variant='primary' label={buttonLabel} />
      <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
    </form>
  )
}