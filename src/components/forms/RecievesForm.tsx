import styles from '@/styles/components/forms/RecievesForm.module.css'
import TextField from '../TextField'
import Placements from '../Placements'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'

interface RecievesFormProps {
  buttonLabel: string;
  fhRecievesValue: string;
  fhLongFhValue: string;
  fhLongMiddleValue: string;
  fhLongBhValue: string;
  fhHalfLongFhValue: string;
  fhHalfLongMiddleValue: string;
  fhHalfLongBhValue: string;
  fhShortFhValue: string;
  fhShortMiddleValue: string;
  fhShortBhValue: string;
  onChangeFhRecieves: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhLongFh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhLongMiddle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhLongBh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhHalfLongFh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhHalfLongMiddle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhHalfLongBh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhShortFh: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhShortMiddle: React.ChangeEventHandler<HTMLInputElement>;
  onChangeFhShortBh: React.ChangeEventHandler<HTMLInputElement>;
  bhRecievesValue: string;
  bhLongFhValue: string;
  bhLongMiddleValue: string;
  bhLongBhValue: string;
  bhHalfLongFhValue: string;
  bhHalfLongMiddleValue: string;
  bhHalfLongBhValue: string;
  bhShortFhValue: string;
  bhShortMiddleValue: string;
  bhShortBhValue: string;
  onChangeBhRecieves: React.ChangeEventHandler<HTMLInputElement>;
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

export default function RecievesForm({ buttonLabel, fhRecievesValue, onChangeFhRecieves, fhLongFhValue, onChangeFhLongFh, fhLongMiddleValue, onChangeFhLongMiddle, fhLongBhValue, onChangeFhLongBh, fhHalfLongFhValue, onChangeFhHalfLongFh, fhHalfLongMiddleValue, onChangeFhHalfLongMiddle, fhHalfLongBhValue, onChangeFhHalfLongBh, fhShortFhValue, onChangeFhShortFh, fhShortMiddleValue, onChangeFhShortMiddle, fhShortBhValue, onChangeFhShortBh, bhRecievesValue, onChangeBhRecieves, bhLongFhValue, onChangeBhLongFh, bhLongMiddleValue, onChangeBhLongMiddle, bhLongBhValue, onChangeBhLongBh, bhHalfLongFhValue, onChangeBhHalfLongFh, bhHalfLongMiddleValue, onChangeBhHalfLongMiddle, bhHalfLongBhValue, onChangeBhHalfLongBh, bhShortFhValue, onChangeBhShortFh, bhShortMiddleValue, onChangeBhShortMiddle, bhShortBhValue, onChangeBhShortBh, validationValue, validationsValue, errorValue, isLoadingValue, changeValidation, changeError, onSubmit }: RecievesFormProps) {

  return (
    <form className={styles.recievesForm} onSubmit={onSubmit}>
      <label htmlFor='fhRecieves'>Number of forehand recieves</label>
      <TextField id='fhRecieves' placeholder='Type here' value={fhRecievesValue} onChange={onChangeFhRecieves} />
      <label htmlFor='bhRecieves'>Number of backhand recieves</label>
      <TextField id='bhRecieves' placeholder='Type here' value={bhRecievesValue} onChange={onChangeBhRecieves} />
      {(fhRecievesValue != '' || fhLongFhValue != '' || fhLongMiddleValue != '' || fhLongBhValue != '' || fhHalfLongFhValue != '' || fhHalfLongMiddleValue != '' || fhHalfLongBhValue != '' || fhShortFhValue != '' || fhShortMiddleValue != '' || fhShortBhValue != '') && <Placements
        label='Distribute all recieves according to their placement:'
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
      {(bhRecievesValue != '' || bhLongFhValue != '' || bhLongMiddleValue != '' || bhLongBhValue != '' || bhHalfLongFhValue != '' || bhHalfLongMiddleValue != '' || bhHalfLongBhValue != '' || bhShortFhValue != '' || bhShortMiddleValue != '' || bhShortBhValue != '') && <Placements
        label='Distribute all backhand recieves according to their placement:'
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