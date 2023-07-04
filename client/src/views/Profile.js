import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../services/user.service";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const Profile = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [user, setUser] = useState({})

    const onchangeHandler = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        })
    }


  const getUserFromService = () => {
    getUser(id)
      .then((response) => {
        console.log(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserFromService();
  }, []);


    const updateUserFromService = () => {
        updateUser(id, user)
            .then((response) => {
                console.log(response.data.user)
            })
            .catch((error) => {
                console.log(error)
            })
    }





  const handleDeleteAccount = () => {
  };

  return (
    <div>
      <h1>Profile</h1>

      







      <Button variant="outlined" onClick={() => setShowConfirmation(true)}>
        Eliminar cuenta
      </Button>

      <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)} maxWidth="xs" fullWidth>
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
  );
};

export default Profile;
