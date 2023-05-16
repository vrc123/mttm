import styles from '@/styles/components/OpponentItem.module.css'
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface OpponentItemProps {
    opponentId: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    country: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function OpponentItem({ opponentId, firstName, middleName, lastName, country, onClick }: OpponentItemProps) {

    const savedOpponentId = useSelector((state: RootState) => state.analysis.opponentId)
    
    return (
        <div className={`${styles.opponentItem} ${opponentId == savedOpponentId ? styles.active : ""}`} onClick={onClick}>
            <p>{firstName} {middleName} {lastName}</p>
            <p>{country}</p>
        </div>
    )
}