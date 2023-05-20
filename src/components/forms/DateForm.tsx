import styles from '@/styles/components/forms/DateForm.module.css'
import CalenderPicker from '../CalenderPicker'
import Button from '../Button'
import Validation from '../Validation'

interface DateFormProps {
  buttonLabel: string;
  dateValue: string;
  validationValue: boolean;
  validationsValue: string[];
  onChangeDate: React.ChangeEventHandler<HTMLInputElement>;
  changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function DateForm({ buttonLabel, dateValue, validationValue, validationsValue, onChangeDate, changeValidation, onSubmit }: DateFormProps) {

  return (
    <form className={styles.dateForm} onSubmit={onSubmit}>
      <label htmlFor='date'>Match date*</label>
      <CalenderPicker id='date' value={dateValue} onChange={onChangeDate}/>
      <Button variant='primary' label={buttonLabel} />
      <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
    </form>
  )
}