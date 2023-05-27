import styles from '@/styles/components/forms/DateForm.module.css'
import CalenderPicker from '../CalenderPicker'
import Button from '../Button'
import Validation from '../Validation'

interface DateFormProps {
  buttonLabel: string;
  dateValue: string;
  validationValue: boolean;
  validationsValue: string[];
  isLoadingValue: boolean;
  onChangeDate: React.ChangeEventHandler<HTMLInputElement>;
  changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function DateForm({ buttonLabel, dateValue, validationValue, validationsValue, isLoadingValue, onChangeDate, changeValidation, onSubmit }: DateFormProps) {

  return (
    <form className={styles.dateForm} onSubmit={onSubmit}>
      <label htmlFor='date'>Match date*</label>
      <CalenderPicker id='date' value={dateValue} onChange={onChangeDate}/>
      {!isLoadingValue && <Button variant='primary' label={buttonLabel} />}
      {isLoadingValue && <p className={styles.loading}>Loading...</p>}
      <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
    </form>
  )
}