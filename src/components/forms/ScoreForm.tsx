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
  isLoadingValue: boolean;
  onChangePlayerSets: React.ChangeEventHandler<HTMLInputElement>;
  onChangeOpponentSets: React.ChangeEventHandler<HTMLInputElement>;
  changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}  

export default function ScoreForm({ buttonLabel, playerSetsValue, opponentSetsValue, validationValue, validationsValue, isLoadingValue, onChangePlayerSets, onChangeOpponentSets, changeValidation, onSubmit }: ScoreFormProps) {

  return (
    <form className={styles.scoreForm} onSubmit={onSubmit}>
      <label htmlFor='playerSets'>Player sets*</label>
      <TextField id='playerSets' placeholder='Type here' value={playerSetsValue} onChange={onChangePlayerSets} />
      <label htmlFor='opponentSets'>Opponent sets*</label>
      <TextField id='opponentSets' placeholder='Type here' value={opponentSetsValue} onChange={onChangeOpponentSets} />
      {!isLoadingValue && <Button variant='primary' label={buttonLabel} />}
      {isLoadingValue && <p className={styles.loading}>Loading...</p>}
      <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
    </form>
  )
}