import { Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import API from "../../api/api.config.ts";
import { useDispatch } from "react-redux";
import { fetchVacancies } from "../../features/vacancies/vacancySlice.ts";
import {VacancyInterface} from "../../types/interfaces/Vacancy.ts";
import {AppDispatch} from "../../store/store.ts";

interface EditFormProps {
    isEdit: boolean;
    toggleModal: () => void;
    id: string | undefined;
    onSuccess?: (vacancy: VacancyInterface) => void;
}

const EditForm: React.FC<EditFormProps> = ({ isEdit, toggleModal, id, onSuccess }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [skills, setSkills] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [api, contextHolder] = notification.useNotification();

    const [errors, setErrors] = useState({
        title: '',
        company: '',
        description: '',
        skills: '',
    });

    const openNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string, description: string) => {
        api[type]({
            message,
            description,
            placement: 'topRight',
        });
    };

    useEffect(() => {
        if (!isEdit || !id) return;

        const getVacancy = async () => {
            try {
                setLoading(true);
                setName('');
                setCompany('');
                setSkills('');
                setMessage('');

                const vacancy = await API.get(`/vacancies/${id}`);
                if (vacancy.status === 200) {
                    const { title, company, skills, description } = vacancy.data;
                    setName(title || '');
                    setCompany(company || '');
                    setSkills(skills || '');
                    setMessage(description || '');
                }
            } catch (error) {
                console.error('Ошибка при загрузке вакансии:', error);
                openNotification('error', 'Ошибка', 'Не удалось загрузить данные вакансии');
            } finally {
                setLoading(false);
            }
        };
        getVacancy();
    }, [isEdit, id]);

    const validateForm = () => {
        const newErrors = {
            title: '',
            company: '',
            description: '',
            skills: '',
        };
        let isValid = true;

        if (!name.trim()) {
            newErrors.title = 'Название вакансии обязательно';
            isValid = false;
        }
        if (!company.trim()) {
            newErrors.company = 'Название компании обязательно';
            isValid = false;
        }
        if (!message.trim()) {
            newErrors.description = 'Описание вакансии обязательно';
            isValid = false;
        }
        if (!skills.trim()) {
            newErrors.skills = 'Навыки обязательны';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (field: string, value: string) => {
        // Обновляем поле
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'company':
                setCompany(value);
                break;
            case 'skills':
                setSkills(value);
                break;
            case 'message':
                setMessage(value);
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [field === 'name' ? 'title' : field === 'message' ? 'description' : field]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const response = await API.put(`/vacancies/${id}`, {
                title: name,
                company,
                skills,
                description: message,
            });
            dispatch(fetchVacancies());
            if (onSuccess) {
                onSuccess(response.data);
            }
            toggleModal();
            openNotification('success', 'Успех', 'Вы успешно отредактировали вакансию');
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
            openNotification('error', 'Ошибка', 'Не удалось сохранить вакансию');
        } finally {
            setLoading(false);
        }
    };

    if (!isEdit) {
        return null;
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Редактирование"
                open={isEdit}
                onOk={toggleModal}
                onCancel={toggleModal}
                centered
                footer={null}
            >
                {loading ? (
                    <div>Загрузка...</div>
                ) : (
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                value={name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className={`border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] focus:outline-none w-full ${errors.title ? 'border-red-500' : ''}`}
                                name="title"
                                type="text"
                                placeholder="Введите название вакансии"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <input
                                value={company}
                                onChange={(e) => handleChange('company', e.target.value)}
                                className={`border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] focus:outline-none w-full ${errors.company ? 'border-red-500' : ''}`}
                                name="company"
                                type="text"
                                placeholder="Введите название компании"
                            />
                            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                        </div>
                        <div>
                            <textarea
                                value={message}
                                onChange={(e) => handleChange('message', e.target.value)}
                                className={`border-[#ECECEC] resize-none overflow-auto border-[1px] p-[5px] rounded-[10px] focus:outline-none w-full ${errors.description ? 'border-red-500' : ''}`}
                                placeholder="Введите описание вакансии"
                                name="description"
                                cols={10}
                                rows={5}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>
                        <div>
                            <input
                                value={skills}
                                onChange={(e) => handleChange('skills', e.target.value)}
                                className={`border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] focus:outline-none w-full ${errors.skills ? 'border-red-500' : ''}`}
                                name="skills"
                                type="text"
                                placeholder="Введите навыки"
                            />
                            {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                        </div>
                        <button
                            className="bg-[#0070FF] border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] text-white w-[200px] self-center cursor-pointer hover:bg-[#116CDB]"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Сохранение...' : 'Редактировать'}
                        </button>
                    </form>
                )}
            </Modal>
        </>
    );
};

export default EditForm;