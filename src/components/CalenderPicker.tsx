import styles from "../styles/components/CalenderPicker.module.css";

interface CalenderPickerProps {
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function CalenderPicker({ id, value, onChange }: CalenderPickerProps) {

  return (
    <input className={styles.calenderPicker} id={id} value={value} onChange={onChange} type='date' />
  )
}