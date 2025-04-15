import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteVacancy, fetchVacancies} from "../../features/vacancies/vacancySlice.ts";
import {Link} from "react-router";
import Feedback from "../Feedback/Feedback.tsx";
import EditForm from "../EditForm/EditForm.tsx";
import { RootState} from "../../types/interfaces/State.ts";
import {AppDispatch} from "../../store/store.ts";

const VacancyList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.vacancies);
    const {isAdmin} = useSelector((state: RootState) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editVacancyId, setEditVacancyId] = useState<string | undefined >();

    useEffect(() => {
        dispatch(fetchVacancies());
    }, [dispatch]);

    if(loading) {
        return <p className="text-center">Загрузка...</p>
    }

    const toggleModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }

        setIsModalOpen(!isModalOpen);
    };

    const toggleEditForm= (e: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
        e.preventDefault();
        e.stopPropagation();
        setEditVacancyId(id)
        setIsEdit(true);
    }

    const handleCloseEditForm = () => {
        setEditVacancyId(undefined);
        setIsEdit(false);
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>,id: number ) => {
        e.preventDefault();
        dispatch(deleteVacancy(Number(id)));
        dispatch(fetchVacancies());
    }
    return (
        <div className="container">
            {items.length === 0 ? (
                <p className="text-center">На данный момент нет свободных вакансий</p>
            ) : (
                items.map(v => (
                    <div key={v.id}>
                        <Link to={`/vacancy/${v.id}`} key={v.id} className="border-[#DCE3EB] border-[1px] p-3 mb-2 rounded-[10px] flex flex-col gap-2 justify-start text-left">
                            <h3 className="font-semibold text-xl">{v.title}</h3>
                            <p className="text-sm text-gray-500">Компания: {v.company}</p>
                            <p className="text-gray-500">Описание:</p>
                            <p className=" w-[100%] overflow-hidden text-ellipsis text-nowrap">{v.description}</p>
                            <p className="text-sm"><span className="text-gray-500">Навыки:</span> {v.skills}</p>
                            {
                                    !isAdmin
                                        ?
                                        (
                                            <button onClick={(e) => toggleModal(e)}
                                                    className="bg-[#0070FF] border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] text-white self-start p-[10px] cursor-pointer :hover:bg-[#116CDB]">Откликнуться</button>
                                            )
                                        : (
                                            <div className="flex gap-2">
                                                <button onClick={(e) => toggleEditForm(e, String(v.id))} className="bg-[black] border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] text-white cursor-pointer">Редактировать</button>
                                                <button onClick={(e) => handleDelete(e, v.id)} className="bg-[red] border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] text-white cursor-pointer">Удалить</button>
                                            </div>
                                        )
                            }
                        </Link>
                        <Feedback isModalOpen={isModalOpen} toggleModal={toggleModal} />
                    </div>
                ))
            )}
            {isEdit && (
                <EditForm
                    isEdit={isEdit}
                    toggleModal={handleCloseEditForm}
                    id={editVacancyId}
                />
            )}
        </div>
    )
}

export default VacancyList