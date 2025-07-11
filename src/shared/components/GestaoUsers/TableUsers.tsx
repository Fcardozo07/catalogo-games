import React from 'react'
import useUsuariosData from '../../hooks/ExibicaoUsers/useUsuariosData'
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export const TablleUsers: React.FC = () => {


    const{
        users,
        setUsers,
        handleDelete
    }=useUsuariosData();

    return(
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Nome</TableCell>
                            <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Email</TableCell>
                            <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Perfil</TableCell>
                            <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell sx={{ fontSize:"20px" }}>{user.nome}</TableCell>
                                <TableCell sx={{ fontSize:"20px" }}>{user.email}</TableCell>
                                <TableCell sx={{ fontSize:"20px" }}>{user.perfil}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <Icon
                                            onClick={() => handleDelete(user.id)}
                                            fontSize="large" color="error">delete</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

            </TableContainer>
        </>
    )



}