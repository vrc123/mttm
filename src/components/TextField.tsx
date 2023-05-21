import styles from "../styles/components/TextField.module.css";

interface TextFieldProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TextField({ id, placeholder, value, onChange }: TextFieldProps) {

  return (
    <input className={styles.textField} id={id} placeholder={placeholder} value={value} onChange={onChange} type='text' />
  )
}