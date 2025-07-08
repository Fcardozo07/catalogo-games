
import { Avatar, Box, Collapse, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme} from "@mui/material";
import { ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from "react"; 
import { useAuthContext } from "../../contexts/AuthContext";
import { FotoUsuario } from "../FotoUsuario/FotoUsuario";




interface IMenuLateralProps {
    children?: React.ReactNode;
};



interface IMenuLateralItemProps {
to: string;
icon: string;
label: string;
onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IMenuLateralItemProps> = ({to, icon, label, onClick}) =>{



const navigate = useNavigate();   

const resolvedPath = useResolvedPath(to);
const match = useMatch({path: resolvedPath.pathname, end: false});


const handelClick = () => {
    navigate(to);
    onClick?.();
};


return(
    <ListItemButton selected={!!match} onClick={handelClick}>
    <ListItemIcon>
    <Icon>{icon}</Icon>
    </ListItemIcon>
    <ListItemText primary={label} />
    </ListItemButton>
);

};

export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
     const {logout, user} = useAuthContext();
    const theme = useTheme();
    const smdown = useMediaQuery(theme.breakpoints.down('sm'));

    const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
    const {toggleTheme} = useAppThemeContext();
    
    const [isAreaAdmOpen, setIsAreaAdemOpen] = useState(false);

    const handleToggleAreaAdm = () => {
        setIsAreaAdemOpen(!isAreaAdmOpen);

   
       
};

    return(
        
        <>
        <Drawer  open={isDrawerOpen} variant={smdown ? 'temporary' : 'permanent'}  onClose={toggleDrawerOpen}>
            <Box width={theme.spacing(28)} height='100% ' display='flex' flexDirection='column'> 
            <FotoUsuario/>

                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <Typography variant="h6">{user?.nome}</Typography>
                </Box>

                <Divider/>          
                
               <Box flex={1}>
                <List component="nav"               
                >
                {drawerOptions.map(drawerOption =>(
                <ListItemLink
                to={drawerOption.path}
                key={drawerOption.path}
                icon={drawerOption.icon}
                label={drawerOption.label}               
                onClick={smdown ? toggleDrawerOpen: undefined}
                />            
                ))}

                </List>
                <ListItemButton onClick={handleToggleAreaAdm}>
                <ListItemIcon>
                    <Icon>admin_panel_settings</Icon>
                </ListItemIcon>
               
                <ListItemText  primary="Área Adm"/>
            
               
                
                
                {isAreaAdmOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={isAreaAdmOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemLink
                    to="/lista-marcas"
                    icon="label" // ícone que você quiser
                    label="Cadastro de Marcas"
                    onClick={smdown ? toggleDrawerOpen : undefined}
                    />

                    <ListItemLink
                    to="/lista-modelos"
                    icon="category" // ícone que você quiser
                    label="Cadastro de Modelos"
                    onClick={smdown ? toggleDrawerOpen : undefined}
                    />

                </List>
                </Collapse>
               </Box>




               <Box>
                <List component="nav">
                <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                    <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar Tema" />
                </ListItemButton>
                </List>
               </Box>
              <Box>
                <List component="nav">
                <ListItemButton onClick={logout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
                </ListItemButton>
                </List>
               </Box>
            </Box>
            
        </Drawer>
        <Box height="100vh" marginLeft={smdown ? 0 : theme.spacing(28)}>
        {children}  
        </Box>
        </>
     
        

    )
};