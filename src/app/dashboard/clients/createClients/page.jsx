'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Page(){
  const router = useRouter()

  const [data, setData] = useState([])
  const [numero, setNum] = useState(0)
  const [entrenador, setEntrenador] = useState(0)
  const [imageSrc, setImageSrc] = useState('/avatar+.svg');
  const [info, setInfo] = useState({
    picture: imageSrc,
    nombre: "",
    ci: "",
    inscription_number: numero,
    date: null,
    plan: false,
    schedule: "",
    phone: "",
    entrenador : undefined,
    status: true
  })
  
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://localhost:3000/api/createClients')
        setData(response.data.trainers)
        setNum(response.data.client.id_ciente ? response.data.client.id_ciente+1: response.data.client)
      }catch(error){
        console.error(error);
      }
    }
    fetchData()
  },[])
  


  const handleImageChange = (e) => {
      const [file] = imgInp.files
      if (file) {
        blah.src = URL.createObjectURL(file)
        setInfo({...info, picture: blah.src})
      }
    
    //   const reader = new FileReader();
    //   reader.onload = () => {
        // setInfo({...info, picture :file.name});
        // setImageSrc(file.name)
    //   };
    //   reader.readAsDataURL(file);
    //   console.log(reader.readAsText(file))
    // }
  }


  const fecha = new Date()
  const d = fecha.getDate()
  const m = fecha.getMonth()+ 1
  const y = fecha.getFullYear()

  const fullDate = `${d}/${m}/${y}`

  const createClient = async() =>{
    try{
      const response = await axios.post('http://localhost:3000/api/createClients',{
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        data:{
          info
        }
      })
      alert(response.data.message)
      router.push('/dashboard/clients')
    }catch(error){
      alert('Error al agregar Cliente')
      router.push('/dashboard/clients')
    }
  }
  
  const addInscriptionNumber = () =>{
    const newInfo = info
    newInfo.inscription_number = numero
    newInfo.date = fecha
    setInfo(newInfo)
    createClient()
  }
  const goBack = ()=>{
    router.push('/dashboard/clients')
  }
  
  return(
    <div className="w-[80%] ml-[20%] max-lg:h-auto h-[auto] bg-slate-100 text-black user-select-none">
      <div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
        <h1 className='text-xl'>New Client's Information</h1>
      </div>
      <div className="h-[auto] w-[98%] user-select-none mx-[1%] mt-5 bg-slate-100 shadow-md rounded-lg">
      <form className="align-middle text-center items-center p-12  bg-white w-[100%]">
        <div className=" md:flex md:flex-row flex flex-col">
          <div className="md:w-[50%] w-[100%] flex flex-col">
            <label htmlFor="imgInp">
              <Image
              className="max-h-[100px] max-w-[100px] rounded-xl mb-5"
              id="blah"
              src={imageSrc}
              alt="avatar+.svg"
              width={280}
              height={100}
              />
              <input type="file" accept="image/*"
              onChange={handleImageChange} id="imgInp"
              // onChange={(e)=>{setInfo({...info, picture: e.target.value})}} 
              className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" 
              />
            </label>
            <input value={info.nombre} name="foto"
              onChange={(e)=>{setInfo({...info, nombre: e.target.value})}} 
              className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" placeholder="Nombre" type="text" />
            <input value={info.ci} 
              onChange={(e)=>setInfo({...info, ci: e.target.value})} 
              className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" placeholder="Carnet" type="text" name="carnet" />
            <input value={numero} 
              className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" placeholder="Numero de inscripcion" type="number" name="inscription_number" readOnly />
            <input className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" placeholder="Fecha de inscripcion" value={`${d}/${m}/${y}`}  type="text" name="inscription_date" readOnly />
          </div>
          <div className="md:w-[50%] w-[100%] flex flex-col">
            <select value={info.plan} 
              onChange={(e)=>{const value = e.target.value === 'true'; setInfo({...info, plan: value})}} 
              className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" placeholder="Plan" type="text" name="plan" 
            >
              <option value={false}>General</option>
              <option value={true}>Personalizado</option>
            </select>
            <input value={info.schedule} onChange={(e)=>setInfo({...info, schedule: e.target.value})} className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" placeholder="Horario" type="text" name="schedule" />
            <input value={info.phone} onChange={(e)=>setInfo({...info, phone: e.target.value})} className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" placeholder="Telefono" type="text" name="phone" />
            <select value={info.entrenador} 
              onChange={(e) => setInfo({ ...info, entrenador: Number.parseInt(e.target.value) })} className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" placeholder="Entrenador" type="text" name="trainer">
            <option className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" value={1}>Seleccione un Entrenador</option>
              {data.map((trainer)=>(
                <option key={trainer.id_entrenador} className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" value={trainer.id_entrenador}>{trainer.nombre}</option>
              ))}
            </select>
            <select value={info.status} 
              onChange={(e)=>{const value = e.target.value === "true";
              ; setInfo({ ...info, status: value })}} 
              className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500" placeholder="Estado" type="text" name="status" 
            >
              <option value={true}>Pagado</option>
              <option value={false}>No Pagado</option>
            </select>
          </div>
        </div>
        <div className="block gap-">
          <button type="button" onClick={addInscriptionNumber}  className="bg-slate-900 px-16 py-3 rounded-md shadow-md mr-10 text-white " >Agregar Cliente</button>
          <button type="button" onClick={goBack} className="bg-red-700 px-16 py-3 rounded-md shadow-md text-white ">Cancelar</button>
        </div>

      </form>
      </div>
    </div>
  )
}