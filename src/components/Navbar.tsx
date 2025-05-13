import { appleImg, searchImg, bagImg } from "../utils"
import { navLists } from "../constants"

const Navbar = () => {
    return (
        <header className="flex w-full py-5 sm:px-10 px-5 justify-between items-center">
            <nav className="flex w-full screen-max-width">
                <img src={appleImg} alt="Apple Image" width={14} height={18} />
                <div className="flex flex-1 justify-center items-center">
                    {navLists.map((item, index) => (
                        <div key={index} className="px-5 text-sm text-gray cursor:pointer hover:text-white transition-all">{item}</div>
                    ))}
                </div>
                <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                    <img src={searchImg} alt="Search Icon" width={14} height={18} />
                    <img src={bagImg} alt="Cart Icon" width={14} height={18} />
                </div>
            </nav>

        </header>
    )
}

export default Navbar