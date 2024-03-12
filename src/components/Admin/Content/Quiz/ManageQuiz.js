import React, { useState, useEffect } from 'react'
import './ManageQuiz.scss';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import Select from 'react-select';
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useTranslation, Trans } from 'react-i18next';
import { useNavigate } from "react-router-dom";
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    // const LIMIT_QUIZ = 5;
    // const [pageCount, setPageCount] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [listQuiz, setListQuiz] = useState([]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);

    const [ShowModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [ShowModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
        // console.log('res:', res);
    }

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        } else {
            // setPreviewImage("");
        }
    }

    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/description is required!');
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        // console.log('res:', res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setImage(null);
            fetchQuiz();
        } else {
            toast.error(res.EM);
        }
    }

    const handleClickUpdateQuiz = (quiz) => {
        setDataUpdateQuiz(quiz);

        setShowModalUpdateQuiz(true);
    }

    const resetUpdateDataQuiz = () => {
        setDataUpdateQuiz({});
    }

    const handleClickDeleteQuiz = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDeleteQuiz(quiz)
    }

    return (
        <div className='quiz-container'>

            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-2"
                justify
            >
                <Tab className="p-3 pt-0" eventKey="profile" title={t('admin.manage-quiz.a1')}>
                    <div className="add-new">
                        <fieldset className='border rounded-3 p-3'>
                            <legend className='float-none w-auto px-3'> {t('admin.manage-quiz.add-quiz')}:</legend>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" placeholder="Your Quiz Name" value={name}
                                    onChange={(event) => setName(event.target.value)} />
                                <label>{t('admin.manage-quiz.quiz-name')}</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" placeholder="description..." value={description}
                                    onChange={(event) => setDescription(event.target.value)} />
                                <label>{t('admin.manage-quiz.quiz-desc')}</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder={"Quiz type..."}
                                />
                            </div>
                            <div className='more-actions form-group'>
                                <label className='mb-1'> {t('admin.manage-quiz.quiz-upload')}</label>
                                <input type='file' className='form-control' onChange={(event) => handleChangeFile(event)} />
                            </div>
                            <div className='form-floating img-preview'>
                                {image ? <img src={image} /> :
                                    <img src="https://img.freepik.com/premium-vector/quiz-comic-pop-art-style_175838-505.jpg" />
                                }
                            </div>

                            <div className='mt-3'>
                                <button onClick={() => handleSubmitQuiz()}
                                    className='btn btn-warning'>Save</button>
                            </div>
                        </fieldset>
                    </div>

                    <div className='list-detail'>
                        <TableQuiz
                            listQuiz={listQuiz}
                            handleClickUpdateQuiz={handleClickUpdateQuiz}
                            handleClickDeleteQuiz={handleClickDeleteQuiz}
                        />
                    </div>

                </Tab>
                <Tab className="p-3 pt-0" eventKey="password" title={t('admin.manage-quiz.a2')}>
                    <QuizQA />
                </Tab>
                <Tab className="p-3 pt-0" eventKey="history" title={t('admin.manage-quiz.a3')} disabled>
                    <AssignQuiz />
                </Tab>
            </Tabs>



            <ModalUpdateQuiz show={ShowModalUpdateQuiz} setShow={setShowModalUpdateQuiz}
                dataUpdateQuiz={dataUpdateQuiz}
                fetchQuiz={fetchQuiz}
                resetUpdateDataQuiz={resetUpdateDataQuiz}
            />

            <ModalDeleteQuiz show={ShowModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                fetchQuiz={fetchQuiz}
                dataDeleteQuiz={dataDeleteQuiz}
            />
        </div>
    )
}

export default ManageQuiz