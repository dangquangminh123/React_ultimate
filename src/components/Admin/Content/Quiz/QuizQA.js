import React, { useState, useEffect, forwardRef } from 'react'
import Select from 'react-select';
import './QuizQA.scss'
import { TbHeartPlus, TbHeartMinus, TbCornerUpLeftDouble } from "react-icons/tb";
import { getQuizWithQA, getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion, postUpsertQA } from '../../../../services/apiService';
import { TbCirclePlus } from "react-icons/tb";
import { FiMinusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from 'react-i18next';

const QuizQA = () => {
    const { t } = useTranslation();
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                },
            ]
        }
    ];

    const [questions, setQuestions] = useState(initQuestion)

    const [listQuiz, setListQuiz] = useState([]);

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    });

    // console.log(">>> questions:", questions);

    const handleAddRemoveQuestion = (type, id) => {
        // console.log(">>>> check:", type, id);
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };

            setQuestions([...questions, newQuestion]);
        }

        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }

    }

    const handleAddRemoveAnswers = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            // Tìm những phần tử answers của chính câu hỏi đó (questionId) sau đó push vào mảng answers
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone);
        }

        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            /* những answers của questions có giá trị index đó sẽ được  lọc qua 1 lần (loại bỏ những answers có id đúng với
            giá trị answers id truyền vào) */
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }

    }
    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);

        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            // console.log(">>> check file: ", event.target.files[0])
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        // console.log(type, answerId, questionId, value);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answer.description = value;
                        }
                    }
                    return answer;
                })
            setQuestions(questionsClone);
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        // console.log(">> check", questions, selectedQuiz);
        // validate Data

        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz!");
            return;
        }

        // Validate answer
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }

        if (isValidAnswer === false) {
            toast.error(`Not empty answer ${indexA + 1} at Question ${indexQ + 1}`)
            return;
        }

        // Validate Question
        let isValidQ = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false;
                indexQ1 = i;
                break;
            }
        }

        if (isValidQ === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`)
            return;
        }
        // console.log(isValid, 'Q=', indexQ, 'A=',indexA);

        // c1 tạo api từ phía frontend
        await Promise.all(questions.map(async (question) => {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
            await Promise.all(question.answers.map(async (answer) => {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }));
        }));

        // c2 tạo api từ phía frontend
        // for (const question of questions) {
        //     const q = await postCreateNewQuestionForQuiz(
        //         +selectedQuiz.value,
        //         question.description,
        //         question.imageFile
        //     );
        //     for (const answer of question.answers) {
        //         await postCreateNewAnswerForQuestion(
        //             answer.description, answer.isCorrect, q.DT.id
        //         )
        //     }
        // }
        let questionsClone = _.cloneDeep(questions);
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile =
                    await toBase64(questionsClone[i].imageFile)
            }
        }

        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        });
        // console.log(">>> check res", res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        }

        // setQuestions(initQuestion);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);

        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true);
        }
    }

    useEffect(() => {
        fetchQuiz();
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz])

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            // .then(function (res) { return res.arrayBuffer(); })
            // .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType })
            );
    }

    const fetchQuizWithQA = async () => {
        let rs = await getQuizWithQA(selectedQuiz.value);
        if (rs && rs.EC === 0) {
            // Convert base64 to File Object
            let newQA = [];
            for (let i = 0; i < rs.DT.qa.length; i++) {
                let q = rs.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png');
                }
                newQA.push(q);
            }
            setQuestions(newQA);
            // console.log(">>> check newQA", newQA)
            // console.log(">>> check rs", rs)
        }
    }

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    // console.log('question:',question)
    return (
        <div className='questions-container'>
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label className='mb-2'>{t('admin.manage-quiz.s-quiz')}</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                {t('admin.manage-quiz.a-questions')}
                </div>
                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className="question-content">
                                    <div className="form-floating description">
                                        <input type="text" className="form-control" placeholder="Description..."
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)} />
                                        <label> {t('admin.manage-quiz.q')}
                                            {index + 1}
                                            {t('admin.manage-quiz.d')}</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                            type={'file'} hidden />

                                        <span>{question.imageName ?
                                            <span style={{ cursor: 'pointer' }}
                                                onClick={() => handlePreviewImage(question.id)}>
                                                {question.imageName}
                                            </span>
                                            : '0 file is uploaded'
                                        }</span>
                                    </div>

                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <TbHeartPlus className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <TbHeartMinus className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {/* Phần answers */}
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    className='form-check-input iscorrect'
                                                    type='checkbox' checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className='form-floating answer-name'>
                                                    <input
                                                        value={answer.description}
                                                        type='type'
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label>{t('admin.manage-quiz.a')} {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswers('ADD', question.id)}>
                                                        <TbCirclePlus className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span span onClick={() => handleAddRemoveAnswers('REMOVE', question.id, answer.id)}>
                                                            <FiMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button onClick={() => handleSubmitQuestionForQuiz()}
                            className='btn btn-warning'> {t('admin.manage-quiz.u')}</button>
                    </div>
                }

                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}>
                    </Lightbox>
                }
            </div>


        </div >
    )
}

export default QuizQA