import {useEffect} from "react";
import { fetchVacancies} from "../../features/vacancies/vacancySlice.ts";
import {useDispatch} from "react-redux";
import { Tabs } from 'antd';
import VacancyList from "../../components/VacancyList/VacancyList.tsx";
import AdminForm from "../../components/AdminForm/AdminForm.tsx";
import {AppDispatch} from "../../store/store.ts";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchVacancies());
    }, [dispatch]);

    const tabsMenu = [
        {
          "label": "Все вакансии",
          "component": <VacancyList/>
        },
        {
          "label": "Создать вакансию",
          "component": <AdminForm/>
        }
    ];

    return (
        <div className="text-center py-[20px] font-bold text-2xl">
            <h1>Админ панель</h1>
            <Tabs
                type="card"
                items={tabsMenu.map((_, i) => {
                    const id = String(i + 1);
                    return {
                        label: `${_.label}`,
                        key: id,
                        children: <>{_.component}</>,
                    };
                })}
            />
        </div>
    )
}

export default Dashboard