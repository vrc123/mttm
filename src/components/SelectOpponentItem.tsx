import styles from '@/styles/components/SelectOpponentItem.module.css'

interface SelectOpponentItemProps {
    selectedOpponentValue: number;
    opponentId: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    country: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function SelectOpponentItem({ selectedOpponentValue, opponentId, firstName, middleName, lastName, country, onClick }: SelectOpponentItemProps) {
    
    return (
        <div className={`${styles.selectOpponentItem} ${opponentId == selectedOpponentValue ? styles.active : ""}`} onClick={onClick}>
            <p>{firstName} {middleName} {lastName}</p>
            <p>{country}</p>
        </div>
    )
}