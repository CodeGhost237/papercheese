import Btnmedia from "../../assets/components/Btnmedia"
import Input from "../../assets/components/input"
import Message from "../../assets/components/message"
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../assets/firebase";
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router";
import "../style/auth/auth.css"



function Auth() {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [click, setClick] = useState(false)
  const [focusName, setFocusName] = useState(false)
  const [focusPhone, setFocusPhone] = useState(false)
  const [focusPwd, setFocusPwd] = useState(false)
  const [error, setError] = useState({ name: "", password: "", phone: "", firebase: "" })
  const [Success, setSuccess] = useState("")
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1)
  const Navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setSuccess("Opération effectué avec succès.")
      Navigate("/Home")

      setTimeout(() => {
        setSuccess("");
      }, 3000)
    } catch (error) {
      const ErrMsg = "Une erreur s'est produite lors de la connexion veuillez reessayer ou rafraichir la page."
      setError((prevError) => ({ ...prevError, firebase: ErrMsg }));
      setTimeout(() => {
        setError((prevError) => ({ ...prevError, firebase: "" }));
      }, 3000)
    }
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (step == 1) {
      await CollecData(e)
    }
    else if (step == 2) {
      await ViewData(e)
    }
  }

  {/*Fonction de connexion à la BD */ }

  const ViewData = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { name, password });
      localStorage.setItem('token', response.data.token); // Stocker le token
      setUser(response.data.user);
      let countDown = 3;
      setSuccess(`Utilisateur connecté avec succès. Vous serez redirigé dans ${countDown}`);

      const timeDown = setInterval(() => {
        countDown -= 1;

        setSuccess(`Utilisateur connecté avec succès. Vous serez redirigé dans ${countDown}`);

        if (countDown === 0) {
          clearInterval(timeDown);
          console.log("Compte à rebours terminé");
          Navigate("/Home")
          setTimeout(()=>{
            setSuccess("");
          },1000)
        }
      }, 1000);

    } catch (err: any) {
      let ErrMsg = "Le mot de passe ou le nom d'utilisateur saisi est incorrect."
      setError((prevError) => ({ ...prevError, firebase: ErrMsg }));

      setTimeout(() => {
        setError((prevError) => ({ ...prevError, firebase: "" }));
      }, 3000)
    }
  };
  {/*Fonction d'inscription à la BD */ }

  const CollecData = async (e: any) => {
    e.preventDefault();

    try {
        let response = await fetch("http://localhost:5000/", {
            method: 'POST',
            body: JSON.stringify({ name, phone, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json(); // Lire le message d'erreur spécifique
            if (response.status == 204) {
                // Gérer les erreurs spécifiques
                if (errorData.error.includes("nom d'utilisateur")) {
                    setError((prevError) => ({ ...prevError, name: "Ce nom est déjà pris." }));
                } else if (errorData.error.includes("numéro de téléphone")) {
                    setError((prevError) => ({ ...prevError, phone: "Ce numéro est déjà utilisé." }));
                } else {
                    setError((prevError) => ({ ...prevError, firebase: errorData.error }));
                }
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return; // Arrête le processus en cas d'erreur
        }

        // Succès
        setSuccess("L'utilisateur est inscrit avec succès");
        setTimeout(() => {
            setSuccess("");
        }, 2000);

        setTimeout(() => {
            NextStep(e);
        }, 2000);

        setError((prevError) => ({ ...prevError, name: "", phone: "", firebase: "", password: "" }));
        setName("");
        setPassword("");
        setPhone("");

    } catch (error) {
        const ErrMsg = "Une erreur s'est produite lors de l'inscription. Veuillez réessayer. Si elle persiste, veuillez actualiser la page.";
        setError((prevError) => ({ ...prevError, firebase: ErrMsg }));

        setTimeout(() => {
            setError((prevError) => ({ ...prevError, firebase: "" }));
        }, 3500);
    }
};


  const NextStep = (e: any) => {
    e.preventDefault()
    setStep(2)
    setError((prevError) => ({ ...prevError, name: "", phone: "", firebase: "", password: "" }))
    setName("")
    setPassword("")
    setPhone("")
  }
  const PrevStep = () => {
    setStep(1)
    setError((prevError) => ({ ...prevError, name: "", phone: "", firebase: "", password: "" }))
    setName("")
    setPassword("")
    setPhone("")
  }

  const validateName = (value: any) => {
    const RegexName = /^(?=.*[aeiouyAEIOUY])[A-Za-z0-9\- 'é]+$/
    if (!value) return "Un nom d'utilisateur est requis.";
    if (!RegexName.test(value)) return "Le format du nom utilisateur est incorrect."
    if (value.length < 3) return "Le nom d'utilisateur est trop court."
    return ""
  }

  const Validatepassword = (value: any) => {
    const RegexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[§+=éç&'"(è_\-);,!ù$#@$!%*?&])[\w§.+=éç&'"(è_\)°:;,!ù$#@.$!%*?&|à ]{7,50}$/;
    if (!value) return "Le mot de passe est requis"
    if (!RegexPassword.test(value)) return "le mot de passe doit contenir au moins 7 caractères alphanumériques ex:#M0t2pa55E."
    if (value == "#M0t2pa55E") return "Vous ne pouvez pas utiliser ce mot de passe."
    return ""
  }

  const ValidatePhone = (value: any) => {
    const RegexPhone = /^\+(\d{1,4})\s?\d{6,14}$/;
    if (!value) return "Le numéro de telephone est requis est requis"
    if (!RegexPhone.test(value)) return "votre numéro de téléphone doit suivre le format suivant: +33123456789."
    return ""
  }



  const handleFocusName = () => {
    setFocusName((prev) => !prev)
  }

  const handleFocusPhone = () => {
    setFocusPhone((prev) => !prev)
  }

  const handleFocusPwd = () => {
    setFocusPwd((prev) => !prev)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setName(value)
    const errMsg = validateName(value)
    setError((prevError: any) => ({ ...prevError, name: errMsg }));
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setPassword(value)
    const errMsg = Validatepassword(value)
    setError((prevError: any) => ({ ...prevError, password: errMsg }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setPhone(value)
    const errMsg = ValidatePhone(value)
    setError((prevError: any) => ({ ...prevError, phone: errMsg }))
  }
  const handleClick = () => {
    setClick((prev) => !prev);
  }

  const isVisible = Object.values(error).some((errMsg) => errMsg)

  return (
    <form className="min-h-screen m-0 flex" onSubmit={handleSubmit} >
      <div className="grand-form flex items-center justify-center min-h-screen py-8 px-20 max-md:px-5">
        <aside className="form-container w-97">
          <div className="logo mb-4 ">
            <h1 className="select-none cursor-pointer text-yellow-300 mb-2 text-2xl text-left max-xl:text-center font-bold"><img src="../../../public/logo/logo.png" width={150} alt="" /></h1>
            <Message label={Success} className_i={"fa-solid fa-circle-check mr-2"} className={`${Success ? "border-green-500 bg-green-100 text-green-500 popanimate" : "hidden"} ${Object.values(error).some((e) => e) ? "hidden" : "border-green-500 bg-green-100 text-green-500 popanimate"}`} />
            <Message label={error.firebase || error.name || error.password || error.phone} className_i={"fa-solid fa-circle-xmark mr-2"} className={`border-red-500 bg-red-100 text-red-500 ${isVisible ? "popanimate" : "hidden"}`} />
          </div>
          <div className="text text-left">

            <div className={step == 2 ? "flex items-center justify-left max-xl:justify-between" : "flex items-center justify-left max-xl:justify-center"}>
              <i className={`step-2 ${step === 2 ? "fas fa-arrow-left text-sm rounded-full px-2 py-1 bg-gray-100 mr-3 cursor-pointer hover:text-white hover:bg-blue-500 transition-all ease-in-out mb-4" : "hidden"}`} onClick={PrevStep} />
              <h1 className="text-3xl flex items-center font-semibold justify-start text-slate-900 mb-4 max-xl:justify-center">{step == 2 ? "Connectez-vous" : "Créez un compte"}</h1>
              <span className={step == 1 ? "hidden" : "visible"}></span>
            </div>

            <p className="text-md  text-gray-500 min-xl:text-center">{step == 2 ? "Hey ! te revoilà. Papercheese te souhaite un bon retour parmi nous." : "Bienvenue sur papercheese, votre gestionnaire de projet personnel."}</p>

          </div>

          <div className="btn-media my-5 text-center"><Btnmedia label={'Continuer avec Google'} img={"./icons/Google.png"} type={"button"} value={"Google"} alt="Google" onClick={handleGoogleLogin} /></div>
          <hr className="border border-gray-50 mb-3" />

          {step === 1 && <div className={step == 1 ? "prevanimate" : "hidden"}>
            <div className="fields flex flex-col w-full">
              <Input placeholder={"Entrer un nom utilisateur"} className={`${focusName ? "shadow-xl transition-all scale-110" : "shadow-none transition-all"} ${error.name ? "border-rose-400" : ""}`} className_i={focusName ? "transition-all fa-solid fa-user mr-2 text-blue-500" : "transition-all fa-solid fa-user mr-2 text-gray-500"} className_f={"hidden"} type={"text"} value={name} onChange={handleNameChange} onFocus={handleFocusName} onBlur={handleFocusName} />

              <Input placeholder={"Ex: +237690227855"} className={`${focusPhone ? "shadow-xl transition-all scale-110" : "shadow-none transition-all"} ${error.phone ? "border-rose-400" : ""}`} className_i={focusPhone ? "transition-all fa-solid fa-phone mr-2 text-green-500" : "transition-all fa-solid fa-phone mr-2 text-gray-500"} className_f={"hidden"} type={"tel"} value={phone} onChange={handlePhoneChange} onFocus={handleFocusPhone} onBlur={handleFocusPhone} />


              <Input placeholder={"Entrer un mot de passe"} className={`${focusPwd ? "shadow-xl transition-all scale-110" : "shadow-none transition-all"} ${error.password ? "border-rose-400" : ""}`} className_i={focusPwd ? "transition-all fa-solid fa-lock mr-2 text-pink-500" : "transition-all fa-solid fa-lock mr-2 text-gray-500"} className_f={click ? "fa-solid fa-eye-slash mr-2 text-gray-500 cursor-pointer" : "fa-solid fa-eye  mr-2 text-gray-500 cursor-pointer"} type={click ? "text" : "password"} value={password} onChange={handlePasswordChange} onclick={handleClick} onFocus={handleFocusPwd} onBlur={handleFocusPwd} />
            </div>

            <div className="recaptcha-container"></div>

            <button className={`w-full py-3 outline-none transition-all text-white mt-2 rounded-md ${Object.values(error).some((e) => e) ? "bg-blue-200 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500 cursor-pointer"}`} disabled={Object.values(error).some((e) => e)} type="submit">S'incrire</button>
            <p className="text-blue-500 mt-3 text-center cursor-pointer hover:bg-gray-100 py-3 rounded-md transition-all" onClick={NextStep} >J'ai déjà un compte</p>
          </div>}

          {step === 2 && <div className={step == 2 ? "nextanimate" : "hidden"}>
            <div className="w-full">
              <div className="flex flex-col">
                <Input placeholder={"Entrer un nom utilisateur"} className={`${focusName ? "shadow-xl transition-all scale-110" : "shadow-none transition-all"} ${error.name ? "border-rose-400" : ""}`} className_i={focusName ? "transition-all fa-solid fa-user mr-2 text-blue-500" : "transition-all fa-solid fa-user mr-2 text-gray-500"} className_f={"hidden"} type={"text"} value={name} onChange={handleNameChange} onFocus={handleFocusName} onBlur={handleFocusName} />

                <Input placeholder={"Entrer un mot de passe"} className={`${focusPwd ? "shadow-xl transition-all scale-110" : "shadow-none transition-all"} ${error.password ? "border-rose-400" : ""}`} className_i={focusPwd ? "transition-all fa-solid fa-lock mr-2 text-pink-500" : "transition-all fa-solid fa-lock mr-2 text-gray-500"} className_f={click ? "fa-solid fa-eye-slash mr-2 text-gray-500 cursor-pointer" : "fa-solid fa-eye  mr-2 text-gray-500 cursor-pointer"} type={click ? "text" : "password"} value={password} onChange={handlePasswordChange} onclick={handleClick} onFocus={handleFocusPwd} onBlur={handleFocusPwd} />
              </div>


              <button className={`w-full py-3 outline-none transition-all text-white mt-2 rounded-md ${Object.values(error).some((e) => e) ? "bg-blue-200 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500 cursor-pointer"}`} disabled={Object.values(error).some((e) => e)} type="submit">Se connecter</button>

              <div className="flex justify-between">
                <p className="text-blue-500 mt-3 text-center cursor-pointer hover:bg-gray-100 py-3 px-2 rounded-md transition-all" onClick={PrevStep}>Je n'ai pas encore de compte</p>
                <p className="text-blue-500 mt-3 text-center cursor-pointer hover:bg-gray-100 py-3 px-2 rounded-md transition-all">Mot de passe oublié?</p>
              </div>
            </div>
          </div>}
        </aside>
      </div>
      <aside className="left-part w-full m-5 rounded-2xl flex items-center justify-center yellow-paper">
      </aside>


    </form>
  )
}

export default Auth
