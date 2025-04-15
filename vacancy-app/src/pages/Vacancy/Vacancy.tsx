import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteVacancy} from "../../features/vacancies/vacancySlice.ts";
import {Link, useNavigate, useParams} from "react-router";
import API from "../../api/api.config.ts";
import EditForm from "../../components/EditForm/EditForm.tsx";
import {VacancyInterface} from "../../types/interfaces/Vacancy.ts";
import {RootState} from "../../types/interfaces/State.ts";
import {AppDispatch} from "../../store/store.ts";
import Feedback from "../../components/Feedback/Feedback.tsx";

interface ApiResponse<T> {
    data: T;
    status: number;
}

const Vacancy = () => {
    const {isAdmin} = useSelector((state: RootState) => state.auth);
    const [vacancy, setVacancy] = useState<VacancyInterface | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const {id} = useParams<{id:string}>();
    const navigate = useNavigate();

    useEffect(()=>{
        async function getVacancy() {
            const res: ApiResponse<VacancyInterface> = await API.get(`/vacancies/${id}`);
            if(res.data) {
                setVacancy(res.data)
            }
        }
        getVacancy();
    },[id])

    const toggleModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }

        setIsModalOpen(!isModalOpen);
    };

    const toggleEditForm= (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEdit(true);
    }

    const handleCloseEditForm = () => {
        setIsEdit(false);
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
        e.preventDefault();

        dispatch(deleteVacancy(Number(id)));

        navigate('/admin');
    }

    const handleEditSuccess = (updatedVacancy: VacancyInterface) => {
        setVacancy(updatedVacancy);
    };

    return (
        <div className="container">
            <Link to={'/'} className="py-[20px] text-blue-500 :hover:text-[#116CDB]"> К списку вакансий</Link>
            <div className=" p-3 mb-2 rounded-[10px] flex flex-col gap-2 justify-center text-center">
                <h3 className="font-semibold text-xl">{vacancy?.title}</h3>
                <p className="text-sm text-gray-500">Компания: {vacancy?.company}</p>
                <p className="text-gray-500">Описание:</p>
                <p className="">{vacancy?.description}</p>
                <p className="text-sm"><span className="text-gray-500">Навыки:</span> {vacancy?.skills}</p>
                {
                    !isAdmin ? (
                            <button onClick={(e) => toggleModal(e)}  className="bg-[#0070FF] border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] text-white w-[200px] self-center p-[10px] cursor-pointer :hover:bg-[#116CDB]">Откликнуться</button>
                        )
                        : (
                            <div className="flex gap-2">
                                <button onClick={(e) => toggleEditForm(e)} className="bg-[black] border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] text-white cursor-pointer">Редактировать</button>
                                <button onClick={(e) => handleDelete(e, id)} className="bg-[red] border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] text-white cursor-pointer">Удалить</button>
                            </div>
                        )
                }
            </div>
            <EditForm
                isEdit={isEdit}
                toggleModal={handleCloseEditForm}
                id={id}
                onSuccess={handleEditSuccess}
            />
            <Feedback isModalOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
    )
}

export default Vacancy