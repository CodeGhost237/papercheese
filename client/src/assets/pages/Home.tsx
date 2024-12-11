import { Searchbar } from "../components/Searchbar"
import '../style/Home/Home.css'
import "../../index.css"

function Home() {
    return (
        <div className ="min-h-screen bg-[#f4fbff] m-0 py-2 flex flex-col">
            <div className="flex justify-around items-center mt-5">
                <div className="logo cursor-pointer"><img src="../../../public/logo/logo.png" width={150} alt="" /></div>
                <Searchbar placeholder={"Recherchez un projet ici ..."} className={"w-96 flex"} className_i={"fas fa-search"}/>
                <button className="bg-blue-400 px-3 py-2 text-white rounded-md hover:bg-blue-600 transition-all"><i className="fas fa-plus mr-2 "></i>Créer un projet</button>
            </div>

            <div className="bg-white min-h-screen m-10 shadow-lg mb-0 rounded-xl">

            </div>
        </div>
    )
}
export default Home