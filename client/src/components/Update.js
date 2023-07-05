// 

import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { getUser, updateUser } from '../services/user.service';
import { Typography, Button, Container, Grid, TextField } from '@mui/material';

export const Update = () => {
    const [user, setUser] = useState({});

    const { usuario } = useContext(UserContext);
    console.log(usuario);

    const getUserFromService = () => {
        getUser(usuario.id)
            .then((res) => {
                console.log(res.data.user);
                setUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const uploadUser = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('imagen', user.imagen);

        updateUser(usuario.id, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const uploadImage = (e) => {
        setUser({ ...user, imagen: e.target.files[0] });
    };

    useEffect(() => {
        getUserFromService();
    }, []);

    return (
        <Container>
            <Typography variant="h4">Actualizar</Typography>
            <form onSubmit={uploadUser}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            type="file"
                            name="imagen"
                            onChange={uploadImage}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit">
                            Subir Imagen
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};
