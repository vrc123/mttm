import styles from '@/styles/components/AnalysisList.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';
import AnalysisItem from './AnalysisItem';
import Button from './Button';

interface Analysis {
    id: number;
    score: string;
    date: string;
    opponents: {
        id: number;
        firstName: string;
        middleName?: string;
        lastName: string;
        country: string;
        birthday: string;
    }
}

interface AnalysisListProps {
    query: string;
    analyses: Analysis[];
}

export default function AnalysisList({ analyses, query }: AnalysisListProps) {

    const [visibleAnalyses, setVisibleAnalyses] = useState(8);
    
    const router = useRouter()

    let filteredAnalyses = analyses.filter(((analysis) => {
        if (query.toLowerCase() === '') {
            return analyses
        } else if (analysis.opponents.middleName == '') {
            if((analysis.opponents.firstName.toLowerCase() + ' ' + analysis.opponents.lastName.toLowerCase()).includes(query.toLocaleLowerCase())) {
                return analyses
            }
        } else if (analysis.opponents.middleName != undefined) {
            if((analysis.opponents.firstName.toLowerCase() + ' ' + analysis.opponents.middleName.toLowerCase() + ' ' + analysis.opponents.lastName.toLowerCase()).includes(query.toLocaleLowerCase())) {
                return analyses
            }
        }
    }))
    
    function showMoreAnalyses() {
      setVisibleAnalyses(visibleAnalyses + 8);
    }
  
    let visibleData = filteredAnalyses.slice(0, visibleAnalyses)


    return (
        <div className={styles.analysisList}>
            <div className={styles.list}>
                {visibleData.map((analysis) => {

                    function selectAnalysis() {
                        router.push("/my-analyses/" + analysis.id)
                    }

                    return (
                        <AnalysisItem key={analysis.id} id={analysis.id} firstName={analysis.opponents.firstName} middleName={analysis.opponents.middleName} lastName={analysis.opponents.lastName} country={analysis.opponents.country} score={analysis.score} date={analysis.date} onClick={selectAnalysis} />
                    )
                })}
            </div>
            {visibleData.length != filteredAnalyses.length && <Button variant='secondary' label='Show more' onClick={showMoreAnalyses} />}
        </div>
    )
}