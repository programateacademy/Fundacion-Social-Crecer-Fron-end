export const numberF = Intl.NumberFormat("es-ES") 
import PasswordValidation from './PasswordValidation.jsx'
import modelUser from '../../assets/img/userImage.png';
import ChangePasswordValidation from './ChangePasswordValidation.jsx';


export default function CardUser({managers,loading,getManagers}) {
    return (
      <div className="userCards">
        {loading ? (
          "Cargando ..."
        ) : (
          managers.map(values => {
            const { docnum, name, email, unity,_id} = values;
            return (
              <div className="cardUser" key={docnum}>
                <div className="dataUser">
                  <div className="stringUser">
                    <div className="nameUser">{name}</div>
                    <div className="nameEmail">{email}</div>
                    <div className="idUser">{numberF.format(docnum)}</div>
                    <div className="nameEmail">{unity}</div>
                  </div>
                  <img className="imgUser" src={modelUser} alt="" />
                </div>
                <div className="profileUserButtons">
                  <ChangePasswordValidation  email={email} getManagers={getManagers}/>
                  <PasswordValidation id={_id} docnum={docnum} name={name} email={email} unity={unity} getManagers={getManagers}/>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
  