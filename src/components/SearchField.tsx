import styles from "@/styles/components/SearchField.module.css";

interface SearchFieldProps {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function SearchField({ placeholder, value, onChange }: SearchFieldProps) {

  return (
    <input className={styles.searchField} placeholder={placeholder} value={value} onChange={onChange} type='search' />
  )
}