import VacancyList from "../../components/VacancyList/VacancyList.tsx";

const Home = () =>{
    return (
        <>
            <main>
                <h2 className="text-black text-center py-[20px] font-bold text-2xl">Вакансии</h2>
                <div className="container"> <VacancyList /></div>
            </main>
        </>
    )
}

export default Home