import styles from '@/styles/components/forms/RecievesForm.module.css'
import TextField from '../TextField'
import Placements from '../Placements'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'

interface RecievesFormProps {
  buttonLabel: string;
  recievesValue: string;
  onChangeRecieves: React.ChangeEventHandler<HTMLInputElement>;
  longFhValue: string;
  onChangeLongFh: React.ChangeEventHandler<HTMLInputElement>;
  longMiddleValue: string;
  onChangeLongMiddle: React.ChangeEventHandler<HTMLInputElement>;
  longBhValue: string;
  onChangeLongBh: React.ChangeEventHandler<HTMLInputElement>;
  halfLongFhValue: string;
  onChangeHalfLongFh: React.ChangeEventHandler<HTMLInputElement>;
  halfLongMiddleValue: string;
  onChangeHalfLongMiddle: React.ChangeEventHandler<HTMLInputElement>;
  halfLongBhValue: string;
  onChangeHalfLongBh: React.ChangeEventHandler<HTMLInputElement>;
  shortFhValue: string;
  onChangeShortFh: React.ChangeEventHandler<HTMLInputElement>;
  shortMiddleValue: string;
  onChangeShortMiddle: React.ChangeEventHandler<HTMLInputElement>;
  shortBhValue: string;
  onChangeShortBh: React.ChangeEventHandler<HTMLInputElement>;
  validationValue: boolean;
  validationsValue: string[];
  errorValue: boolean;
  changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
  changeError: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function RecievesForm({ buttonLabel, recievesValue, onChangeRecieves, longFhValue, onChangeLongFh, longMiddleValue, onChangeLongMiddle, longBhValue, onChangeLongBh, halfLongFhValue, onChangeHalfLongFh, halfLongMiddleValue, onChangeHalfLongMiddle, halfLongBhValue, onChangeHalfLongBh, shortFhValue, onChangeShortFh, shortMiddleValue, onChangeShortMiddle, shortBhValue, onChangeShortBh, validationValue, validationsValue, errorValue, changeValidation, changeError, onSubmit }: RecievesFormProps) {

  return (
    <form className={styles.recievesForm} onSubmit={onSubmit}>
        <TextField placeholder='Number of recieves' value={recievesValue} onChange={onChangeRecieves} />
        {recievesValue != '' && <Placements
            label='Distribute all recieves according to their placement:'
            longFhValue={longFhValue}
            longFhOnChange={onChangeLongFh}
            longMiddleValue={longMiddleValue}
            longMiddleOnChange={onChangeLongMiddle}
            longBhValue={longBhValue}
            longBhOnChange={onChangeLongBh}
            halfLongFhValue={halfLongFhValue}
            halfLongFhOnChange={onChangeHalfLongFh}
            halfLongMiddleValue={halfLongMiddleValue}
            halfLongMiddleOnChange={onChangeHalfLongMiddle}
            halfLongBhValue={halfLongBhValue}
            halfLongBhOnChange={onChangeHalfLongBh}
            shortFhValue={shortFhValue}
            shortFhOnChange={onChangeShortFh}
            shortMiddleValue={shortMiddleValue}
            shortMiddleOnChange={onChangeShortMiddle}
            shortBhValue={shortBhValue}
            shortBhOnChange={onChangeShortBh}
        />}
        <Button variant='primary' label={buttonLabel} />
        <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
        <Error error={errorValue} setError={changeError} />
    </form>
  )
}