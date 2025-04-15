import {Link} from "react-router";

const Header = () => {
    return (
        <header className="flex flex-col items-center gap-9 bg-black text-white">
            <div className="max-w-[1200px] w-full p-[30px] m-auto">
                <div className="flex items-center gap-[20px]">
                    <Link to={'/'} className="w-[40px]">
                        <img className="w-[100%] h-[100%] object-cover" src="../../../public/assets/images/icon.png"
                             alt="icon logo"/>
                    </Link>
                    <Link to={'/'}>JobWave</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;