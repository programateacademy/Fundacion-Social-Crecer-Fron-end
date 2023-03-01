import React, { useEffect } from 'react';
import CardUser from './CardUser.jsx';
import './Managers.css';
import SearchManagers from './SearchManagers.jsx';
import ModalContainerAddUser from './ModalContainerAddUser.jsx';
import Header from '../../components/header/Header.jsx';
import User from '../../apis'

function Managers({onLogout, token}) {
  //initial configuration for get, add, and show the managers 
  const [managers,setManagers ] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const getManagers = async () => {
    const json = await fetch('http://localhost:3001/api/manager')
      .then(res => res.json());
    setManagers(json);
    setLoading(false);
  }

  useEffect(() => {
    getManagers();
  }, []);

  const localStorageManagers=localStorage.getItem('MANAGERS_V1');
  let parsedManagers;
  if (!localStorageManagers){
    localStorage.setItem('MANAGERS_V1',JSON.stringify([]));
  }
  else{
    parsedManagers=JSON.parse(localStorageManagers);
  }

  const [searchValue, setSearchValue]=React.useState('');

  const saveManagers=(newManagers)=>{
    const stringifiedManagers=JSON.stringify(newManagers);
    localStorage.setItem('MANAGERS_V1',stringifiedManagers);
    setManagers(newManagers);
  };

  
  
  let quitAccent=function (cadena){
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
  }
  let searchedManagers=[];
  if (!searchValue.length>=1)
  {
    searchedManagers=managers;
  } 
  else{
    searchedManagers=managers.filter(manager=>{
      const managerName=quitAccent(manager.name.toLowerCase());
      const searchText=quitAccent(searchValue.toLowerCase());
      const managerEmail=quitAccent(manager.email.toLowerCase());
      const managerID=manager.id.toString();
      return (managerName.includes(searchText)||managerEmail.includes(searchText)||managerID.includes(searchText));
      
    });
  }
 const addManagers = async(item) => {
    const json = await fetch ('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(item),
    }).then(res => res.json())

    if (json.error) {
      alert(json.error)
    } else {
      const updatedManagers = [...managers, json];
      setManagers(updatedManagers);
      getManagers();
    }
  };

  const editarUsuario=(id,setUser,nuevoNombre,nuevoEmail,nuevaUnidad)  => {
    const  usuarioIndex=managers.findIndex((usuario)=>usuario.docnum===id);

    if (usuarioIndex!==-1){
      const usuariosActualizados=[...managers];
      usuariosActualizados[usuarioIndex].name=nuevoNombre;
      usuariosActualizados[usuarioIndex].email=nuevoEmail;
      usuariosActualizados[usuarioIndex].unity=nuevaUnidad;
      setUser(usuariosActualizados);
    }

  };
  const eliminateManager = (id, setUser) => {
    const index = managers.findIndex((usuario) => usuario.docnum === id);
  
    if (index !== -1) {
      const nuevosManagers = [...managers];
      nuevosManagers.splice(index, 1);
      setUser(nuevosManagers);
    }
  };
  
  return (
    <>
      <Header onLogout={onLogout} token={token}/>
      <div className='filaUno'>
        <SearchManagers searchValue={searchValue} setSearchValue={setSearchValue}/>
        <ModalContainerAddUser add={addManagers} managers={managers}/>
      </div>
      <CardUser managers={managers} setManagers={setManagers} editManagers={editarUsuario} eliminateManager={eliminateManager} loading={loading}/>
    </>
  );
}

export default Managers;
