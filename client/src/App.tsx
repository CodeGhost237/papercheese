import Btnmedia from "./assets/components/Btnmedia"
import Input from "./assets/components/input"
import Message from "./assets/components/message"
import { useState } from "react"

function App() {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [click, setClick] = useState(false)

  const handleNameChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setName(value)
  }

  const handlePasswordChange = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setPassword(value)
  }

  const handlePhoneChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setPhone(value)
  }
  const handleClick = () => {
    setClick((prev) => !prev);
  }

  return (
    <form className="min-h-screen m-0 flex">
      <div className="grand-form flex items-center min-h-screen px-20">
        <aside className="form-container w-97">
          <div className="logo mb-8 ">
            <h1 className="select-none cursor-pointer text-yellow-300 mb-2 text-xl text-left font-bold"><span className="text-yellow-200">PAPER</span>CHEESE</h1>
            <Message label = {"Ceci est un message d'erreur"}/>
          </div>
          <div className="text">
            <h1 className="text-3xl text-left font-semibold text-slate-900 my-4 ">Créez un compte</h1>
            <p className="text-md text-left text-gray-500">Bienvenue sur papercheese, votre gestionnaire de tache personnel.</p>
          </div>

          <div className="btn-media my-5 text-center"><Btnmedia label={'Continuer avec Google'} img={"./icons/Google.png"} type={"button"} value={"Google"} alt="Google" /></div>
          <hr className="border border-gray-50 mb-3" />

          <div className="fields flex flex-col w-full">
            <Input placeholder={"Entrer votre nom complet"} className_i="fa-solid fa-user mr-2 text-gray-500" className_f={"hidden"} type={"text"} value={name} onChange={handleNameChange} />
            <Input placeholder={"Ex: +237690227855"} className_i="fa-solid fa-phone mr-2 text-gray-500" className_f={"hidden"} type={"text"} value={phone} onChange={handlePhoneChange} />
            <Input placeholder={"Entrer un mot de passe"} className_i="fa-solid fa-lock mr-2 text-gray-500" className_f={click ? "fa-solid fa-eye-slash mr-2 text-gray-500 cursor-pointer": "fa-solid fa-eye  mr-2 text-gray-500 cursor-pointer"} type={click ? "text" : "password"} value={password} onChange={handlePasswordChange} onclick={handleClick} />
          </div>

          <button className="w-full py-3 bg-blue-500 outline-none hover:bg-blue-600 transition-all text-white mt-2 rounded-md">S'incrire</button>
          <p className="text-blue-500 mt-3 text-center cursor-pointer hover:bg-gray-100 py-3 rounded-md transition-all">J'ai déjà un compte</p>
        </aside>
      </div>
      <aside className="left-part w-full m-5 rounded-2xl flex items-center justify-center">
        <p>"Lorem ipsum dolor sit amet consectetur."</p>
      </aside>


    </form>
  )
}

export default App
