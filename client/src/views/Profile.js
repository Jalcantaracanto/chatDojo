// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getUser, updateUser, deleteUser } from "../services/user.service";

// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";



// const Profile = () => {

//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log(id);
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const [user, setUser] = useState({})

//   const onchangeHandler = (e) => {
//     const { name, value } = e.target
//     setUser({
//       ...user,
//       [name]: value,
//     })
//   }


//   const getUserFromService = () => {
//     getUser(id)
//       .then((response) => {
//         console.log(response.data.user.nickname);
//         setUser(response.data)
//         console.log(user)
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   console.log(user.user)

// /*   useEffect(() => {
//     getUserFromService();
//   }, []); */


//   const updateUserFromService = () => {
//     updateUser(id, user)
//       .then((response) => {
//         console.log(response.data.user)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }

//   const handleDeleteAccount = () => {
//     deleteUser(id)
//       .then((response) => {
//         console.log(response.data.user)
//         navigate('/')
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }

//   useEffect(() => {
//     getUserFromService()

//   }
//   , [])



//   return (
//     <div>
      
//       <Typography variant="subtitle1" sx={{ color: 'black' }}>
//      {user ? ` Hola ${user.user.nickname},` : '¿'}
//       <br/>
//         Quieres eliminar tu cuenta?
//       </Typography>
//       <Button variant="outlined" color="error" onClick={() => setShowConfirmation(true)} >
//         Eliminar cuenta
//       </Button>

//       <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)} maxWidth="xs" >
//         <DialogTitle>Confirmación</DialogTitle>
//         <DialogContent>
//           <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteAccount} color="error" >
//             Sí, eliminar cuenta
//           </Button>
//           <Button onClick={() => setShowConfirmation(false)} color="inherit">
//             Cancelar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser, deleteUser } from "../services/user.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress
} from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const getUserFromService = () => {
    getUser(id)
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserFromService = () => {
    updateUser(id, user)
      .then((response) => {
        console.log(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAccount = () => {
    deleteUser(id)
      .then((response) => {
        console.log(response.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserFromService();
  }, []);

  useEffect(() => {
    console.log(user.user);
  }, [user]);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <Typography variant="subtitle1" sx={{ color: "black" }}>
            Hola {user.user.nickname},
            <br />
            Quieres eliminar tu cuenta?
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setShowConfirmation(true)}
          >
            Eliminar cuenta
          </Button>

          <Dialog
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            maxWidth="xs"
          >
            <DialogTitle>Confirmación</DialogTitle>
            <DialogContent>
              <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteAccount} color="error">
                Sí, eliminar cuenta
              </Button>
              <Button onClick={() => setShowConfirmation(false)} color="inherit">
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Profile;

