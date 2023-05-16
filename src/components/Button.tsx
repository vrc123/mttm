import styles from '@/styles/components/Button.module.css'

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'delete',
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ variant, label, onClick }: ButtonProps) {

  return (
    <button className={`${styles.buttonDefault} ${styles[variant]}`} onClick={onClick}>{label}</button>
  )
}