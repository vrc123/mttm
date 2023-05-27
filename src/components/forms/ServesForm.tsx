import styles from '@/styles/components/forms/ServesForm.module.css'
import TextField from '../TextField'
import Placements from '../Placements'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'

interface ServesFormProps {
  buttonLabel: string;
  fhServesValue: string;
  fhLongFhValue: string;
  fhLongMiddleValue: string;
  fhLongBhValue: string;
  fhHalfLongFhValue: string;
  fhHalfLongMiddleValue: string;
  fhHalfLongBhValue: string;
  fhShortFhValue: string;
  fhShortMiddleValue: string;
  fhShortBhValue: string;
  onChangeFhServes: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhLongFh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhLongMiddle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhLongBh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhHalfLongFh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhHalfLongMiddle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhHalfLongBh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhShortFh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhShortMiddle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhShortBh: React.ChangeEventHandler<HTMLInputElement>;
  bhServesValue: string;
  bhLongFhValue: string;
  bhLongMiddleValue: string;
  bhLongBhValue: string;
  bhHalfLongFhValue: string;
  bhHalfLongMiddleValue: string;
  bhHalfLongBhValue: string;
  bhShortFhValue: string;
  bhShortMiddleValue: string;
  bhShortBhValue: string;
  onChangeBhServes: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBhLongFh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBhLongMiddle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBhLongBh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBhHalfLongFh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBhHalfLongMiddle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBhHalfLongBh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBhShortFh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBhShortMiddle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBhShortBh: React.ChangeEventHandler<HTMLInputElement>;
  validationValue: boolean;
  validationsValue: string[];
  errorValue: boolean;
  isLoadingValue: boolean;
  changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
  changeError: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}  

export default function ServesForm({ buttonLabel, fhServesValue, onChangeFhServes, fhLongFhValue, onChangeFhLongFh, fhLongMiddleValue, onChangeFhLongMiddle, fhLongBhValue, onChangeFhLongBh, fhHalfLongFhValue, onChangeFhHalfLongFh, fhHalfLongMiddleValue, onChangeFhHalfLongMiddle, fhHalfLongBhValue, onChangeFhHalfLongBh, fhShortFhValue, onChangeFhShortFh, fhShortMiddleValue, onChangeFhShortMiddle, fhShortBhValue, onChangeFhShortBh, bhServesValue, onChangeBhServes, bhLongFhValue, onChangeBhLongFh, bhLongMiddleValue, onChangeBhLongMiddle, bhLongBhValue, onChangeBhLongBh, bhHalfLongFhValue, onChangeBhHalfLongFh, bhHalfLongMiddleValue, onChangeBhHalfLongMiddle, bhHalfLongBhValue, onChangeBhHalfLongBh, bhShortFhValue, onChangeBhShortFh, bhShortMiddleValue, onChangeBhShortMiddle, bhShortBhValue, onChangeBhShortBh, validationValue, validationsValue, errorValue, isLoadingValue, changeValidation, changeError, onSubmit }: ServesFormProps) {

  return (
    <form className={styles.servesForm} onSubmit={onSubmit}>
      <label htmlFor='fhServes'>Number of forehand serves</label>
      <TextField id='fhServes' placeholder='Type here' value={fhServesValue} onChange={onChangeFhServes} />
      <label htmlFor='bhServes'>Number of backhand serves</label>
      <TextField id='bhServes' placeholder='Type here' value={bhServesValue} onChange={onChangeBhServes} />
      {(fhServesValue != '' || fhLongFhValue != '' || fhLongMiddleValue != '' || fhLongBhValue != '' || fhHalfLongFhValue != '' || fhHalfLongMiddleValue != '' || fhHalfLongBhValue != '' || fhShortFhValue != '' || fhShortMiddleValue != '' || fhShortBhValue != '') && <Placements
        label='Distribute all forhand serves according to their placement:'
        longFhId='fhLongFhId'
        longMiddleId='fhLongMiddleId'
        longBhId='fhLongBhId'
        halfLongFhId='fhHalfLongFhId'
        halfLongMiddleId='fhHalfLongMiddleId'
        halfLongBhId='fhHalfLongBhId'
        shortFhId='fhShortFhId'
        shortMiddleId='fhShortMiddleId'
        shortBhId='fhShortBhId'
        longFhValue={fhLongFhValue}
        longFhOnChange={onChangeFhLongFh}
        longMiddleValue={fhLongMiddleValue}
        longMiddleOnChange={onChangeFhLongMiddle}
        longBhValue={fhLongBhValue}
        longBhOnChange={onChangeFhLongBh}
        halfLongFhValue={fhHalfLongFhValue}
        halfLongFhOnChange={onChangeFhHalfLongFh}
        halfLongMiddleValue={fhHalfLongMiddleValue}
        halfLongMiddleOnChange={onChangeFhHalfLongMiddle}
        halfLongBhValue={fhHalfLongBhValue}
        halfLongBhOnChange={onChangeFhHalfLongBh}
        shortFhValue={fhShortFhValue}
        shortFhOnChange={onChangeFhShortFh}
        shortMiddleValue={fhShortMiddleValue}
        shortMiddleOnChange={onChangeFhShortMiddle}
        shortBhValue={fhShortBhValue}
        shortBhOnChange={onChangeFhShortBh}
      />}
      {(bhServesValue != '' || bhLongFhValue != '' || bhLongMiddleValue != '' || bhLongBhValue != '' || bhHalfLongFhValue != '' || bhHalfLongMiddleValue != '' || bhHalfLongBhValue != '' || bhShortFhValue != '' || bhShortMiddleValue != '' || bhShortBhValue != '') && <Placements
        label='Distribute all backhand serves according to their placement:'
        longFhId='bhLongFhId'
        longMiddleId='bhLongMiddleId'
        longBhId='bhLongBhId'
        halfLongFhId='bhHalfLongFhId'
        halfLongMiddleId='bhHalfLongMiddleId'
        halfLongBhId='bhHalfLongBhId'
        shortFhId='bhShortFhId'
        shortMiddleId='bhShortMiddleId'
        shortBhId='bhShortBhId'
        longFhValue={bhLongFhValue}
        longFhOnChange={onChangeBhLongFh}
        longMiddleValue={bhLongMiddleValue}
        longMiddleOnChange={onChangeBhLongMiddle}
        longBhValue={bhLongBhValue}
        longBhOnChange={onChangeBhLongBh}
        halfLongFhValue={bhHalfLongFhValue}
        halfLongFhOnChange={onChangeBhHalfLongFh}
        halfLongMiddleValue={bhHalfLongMiddleValue}
        halfLongMiddleOnChange={onChangeBhHalfLongMiddle}
        halfLongBhValue={bhHalfLongBhValue}
        halfLongBhOnChange={onChangeBhHalfLongBh}
        shortFhValue={bhShortFhValue}
        shortFhOnChange={onChangeBhShortFh}
        shortMiddleValue={bhShortMiddleValue}
        shortMiddleOnChange={onChangeBhShortMiddle}
        shortBhValue={bhShortBhValue}
        shortBhOnChange={onChangeBhShortBh}
      />}
      {!isLoadingValue && <Button variant='primary' label={buttonLabel} />}
      {isLoadingValue && <p className={styles.loading}>Loading...</p>}
      <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
      <Error error={errorValue} setError={changeError} />
    </form>
  )
}