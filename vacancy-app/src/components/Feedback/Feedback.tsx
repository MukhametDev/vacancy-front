import { Modal, notification } from "antd";
import React, { useState } from "react";
import API from "../../api/api.config.ts";

interface FeedbackProps {
    isModalOpen: boolean;
    toggleModal: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Feedback: React.FC<FeedbackProps> = ({ isModalOpen, toggleModal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.success({
            message: 'Отклик на вакансию',
            description: 'Вы успешно откликнулись на вакансию!',
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            phone: '',
            message: '',
        };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Имя обязательно';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email обязателен';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Введите корректный email';
            isValid = false;
        }

        if (!phone.trim()) {
            newErrors.phone = 'Телефон обязателен';
            isValid = false;
        } else if (!/^\+?\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Введите корректный телефон (10-15 цифр)';
            isValid = false;
        }

        if (!message.trim()) {
            newErrors.message = 'Сообщение обязательно';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (field: string, value: string) => {
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'message':
                setMessage(value);
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const response = await API.post(`/vacancies/respond`, {
                name,
                email,
                phone,
                message,
            });

            if (response.status === 200) {
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
                setErrors({ name: '', email: '', phone: '', message: '' });
                toggleModal();
                openNotification();
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            api.error({
                message: 'Ошибка',
                description: 'Не удалось отправить отклик',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Обратная связь"
                open={isModalOpen}
                onOk={toggleModal}
                onCancel={toggleModal}
                centered
                footer={null}
            >
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            value={name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={`border-[#ECECEC] border-[2px] p-[5px] rounded-[10px] w-full ${errors.name ? 'border-red-500' : ''}`}
                            name="name"
                            type="text"
                            placeholder="Введите имя"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <input
                            value={email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={`border-[#ECECEC] border-[2px] p-[5px] rounded-[10px] w-full ${errors.email ? 'border-red-500' : ''}`}
                            name="email"
                            type="email"
                            placeholder="Введите email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <input
                            value={phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className={`border-[#ECECEC] border-[2px] p-[5px] rounded-[10px] w-full ${errors.phone ? 'border-red-500' : ''}`}
                            name="phone"
                            type="tel"
                            placeholder="Введите телефон"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                        <textarea
                            value={message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            className={`border-[#ECECEC] border-[2px] p-[5px] rounded-[10px] resize-none overflow-auto w-full ${errors.message ? 'border-red-500' : ''}`}
                            placeholder="Расскажите о себе"
                            name="message"
                            cols={10}
                            rows={5}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <button
                        className="bg-[#0070FF] border-[#ECECEC] border-[1px] p-[5px] rounded-[10px] text-white w-[200px] self-center cursor-pointer hover:bg-[#116CDB]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Отправка...' : 'Откликнуться'}
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default Feedback;