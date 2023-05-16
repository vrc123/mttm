import styles from "@/styles/components/CalenderPicker.module.css";

interface CalenderPickerProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function CalenderPicker({ value, onChange }: CalenderPickerProps) {

  return (
    <input className={styles.calenderPicker} value={value} onChange={onChange} type='date' />
  )
}