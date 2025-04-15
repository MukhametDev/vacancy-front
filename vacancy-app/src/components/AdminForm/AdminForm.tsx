import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { createVacancy } from "../../features/vacancies/vacancySlice.ts";
import {useNavigate} from "react-router";
import {AppDispatch} from "../../store/store.ts";

const AdminForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        company: '',
        description: '',
        skills: '',
    });

    const [errors, setErrors] = useState({
        title: '',
        company: '',
        description: '',
        skills: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Очищаем ошибку при изменении поля
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {
            title: '',
            company: '',
            description: '',
            skills: '',
        };
        let isValid = true;

        if (!form.title.trim()) {
            newErrors.title = 'Название вакансии обязательно';
            isValid = false;
        }
        if (!form.company.trim()) {
            newErrors.company = 'Название компании обязательно';
            isValid = false;
        }
        if (!form.description.trim()) {
            newErrors.description = 'Описание вакансии обязательно';
            isValid = false;
        }
        if (!form.skills.trim()) {
            newErrors.skills = 'Навыки обязательны';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await dispatch(createVacancy(form)).unwrap();
            setForm({
                title: '',
                company: '',
                description: '',
                skills: '',
            });
            navigate('/admin');
        } catch (err) {
            console.error('Ошибка создания вакансии:', err);
            alert('Не удалось создать вакансию');
        }
    };

    return (
        <div className="container">
            <div className="flex justify-center items-center py-[30px]">
                <div className="flex flex-col gap-4 text-black bg-[#FCFCFC] border-[#ECECEC] border-[1px] p-[30px] rounded-[10px] w-full">
                    <h2 className="text-center font-bold text-2xl">Форма создания вакансии</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className={`border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] focus:outline-none w-full ${errors.title ? 'border-red-500' : ''}`}
                                type="text"
                                placeholder="Название вакансии"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <input
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                className={`border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] focus:outline-none w-full ${errors.company ? 'border-red-500' : ''}`}
                                type="text"
                                placeholder="Название компании"
                            />
                            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                        </div>
                        <div>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className={`border-[#ECECEC] resize-none overflow-auto border-[1px] p-[5px] rounded-[10px] focus:outline-none w-full ${errors.description ? 'border-red-500' : ''}`}
                                cols={5}
                                rows={5}
                                placeholder="Описание вакансии"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>
                        <div>
                            <input
                                name="skills"
                                value={form.skills}
                                onChange={handleChange}
                                className={`border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] focus:outline-none w-full ${errors.skills ? 'border-red-500' : ''}`}
                                type="text"
                                placeholder="Навыки"
                            />
                            {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                        </div>
                        <button
                            className="bg-black text-white p-[10px] rounded-[10px] hover:bg-gray-800"
                            type="submit"
                        >
                            Создать
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminForm;