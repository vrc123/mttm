import styles from '@/styles/components/forms/OpponentForm.module.css'
import TextField from '../TextField'
import CalenderPicker from '../CalenderPicker'
import Button from '../Button'
import Validation from '../Validation'
import Error from '../Error'

interface OpponentFormProps {
  buttonLabel: string;
  firstNameValue: string;
  middleNameValue: string;
  lastNameValue: string;
  countryValue: string;
  birthdayValue: string;
  validationValue: boolean;
  validationsValue: string[];
  errorValue: boolean;
  onChangeFirstName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeMiddleName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeLastName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeCountry: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBirthday: React.ChangeEventHandler<HTMLInputElement>;
  changeValidation: React.Dispatch<React.SetStateAction<boolean>>;
  changeError: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function OpponentForm({ buttonLabel, firstNameValue, middleNameValue, lastNameValue, countryValue, birthdayValue, validationValue, validationsValue, errorValue, onChangeFirstName, onChangeMiddleName, onChangeLastName, onChangeCountry, onChangeBirthday, changeValidation, changeError, onSubmit }: OpponentFormProps) {

  return (
    <form className={styles.opponentForm} onSubmit={onSubmit}>
      <p>Fill in the opponent information:</p>
      <TextField placeholder='First Name' value={firstNameValue} onChange={onChangeFirstName} />
      <TextField placeholder='Middle Name' value={middleNameValue} onChange={onChangeMiddleName} />
      <TextField placeholder='Last Name' value={lastNameValue} onChange={onChangeLastName} />
      <TextField placeholder='Country' value={countryValue} onChange={onChangeCountry} />
      <CalenderPicker value={birthdayValue} onChange={onChangeBirthday} />
      <Button variant='primary' label={buttonLabel} />
      <Validation validation={validationValue} setValidation={changeValidation} validations={validationsValue} />
      <Error error={errorValue} setError={changeError} />
    </form>
  )
}