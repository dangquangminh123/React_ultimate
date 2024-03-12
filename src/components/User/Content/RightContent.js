import React from 'react'
import CountDown from './CountDown';
import { useRef } from 'react';

const RightContent = (props) => {
    // useRef dùng để thao tác với các phần tử elements html
    const refDiv = useRef([]);

    const setRef = (ref) => {
        refDiv.push(ref);
    }

    const { dataQuiz } = props;

    const onTimeUp = () => {
        props.handleFinishQuiz();
    }

    const getClassQuestion = (index, question) => {
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return "question selected";
            }
        }
        return "question abc";
    }

    const handleClickQuestion = (index, question) => {
        props.setIndex(index);
        if (refDiv.current) {
            // console.log(refDiv.current);
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question";
                }
            })
        }

        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return "question selected";
            }
        }
        refDiv.current[index].className = "question clicked";
    }
    // console.log("dataQuiz:", dataQuiz);
    return (
        <>
            <div className='main-timer'>
                <CountDown onTimeUp={onTimeUp} />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`question-abc-${index}`}
                                className={getClassQuestion(index, item)}
                                onClick={() => handleClickQuestion(index, item)}
                                ref={element => refDiv.current[index] = element}>
                                {index + 1}
                            </div>
                        )
                    })
                }
            </div >
        </>
    )
}

export default RightContent