import styles from "@/styles/components/TextField.module.css";

interface TextFieldProps {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TextField({ placeholder, value, onChange }: TextFieldProps) {

  return (
    <input className={styles.textField} placeholder={placeholder} value={value} onChange={onChange} type='text' />
  )
}