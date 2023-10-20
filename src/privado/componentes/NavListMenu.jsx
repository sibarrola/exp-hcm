import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, List, ListItem, ListItemButton, Typography } from '@mui/material';
/* import HomeIcon from '@mui/icons-material/Home'; */
import logo1 from '../../assets/logo-160px.fw.png'
/* import ArticleIcon from '@mui/icons-material/Article'; */
import { PropTypes } from 'prop-types';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';

export const NavListMenu = ({ navVectLinks, navVectGestion1, navVectGestion2, navVectGestion3, NavLink, setOpen }) => {


    return (
        <Box sx={{ backgroundColor: '#eceff1', height: '80vh', width: '180px', }} >
            {/*  <Box sx={{ backgroundColor:'lightyellow', height: '100vh', width: '180px' }} >  */}
            {/*    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', boxSizing: 'border-box', color: 'black' }} >
                <img src={logo1} alt="logo" height={80} />
            </Box> */}
            <Typography sx={{ display: 'flex', justifyContent: 'center', fontWeight: 900, marginTop: '130px', color: 'blue', fontSize: '12px' }}>Honorable Concejo Municipal</Typography>
            <Divider />
            <ListItem disablePadding sx={{ mt: 5 }}>

                <ListItemButton
                    color="inherit"
                    component={NavLink}
                    to="/privado/menu"
                    onClick={() => setOpen(false)}
                    sx={{
                        ":hover": {
                            backgroundColor: 'bisque'
                        }
                    }}
                >
                    <HomeIcon />

                    <Typography variant='subtitle1' sx={{ marginLeft: 2 }}  >
                        Inicio
                    </Typography>
                </ListItemButton  >
            </ListItem>

            <List sx={{ m: 1 }}>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<GridExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ backgroundColor: '#cfd8dc' }}
                    >
                        <Typography variant="body1" fontWeight="bold" sx={{ mt: 1, ml: 1, mr: 1, justifyContent: 'center' }} >Entidades</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        backgroundColor: '#f1f8e9'
                    }} >
                        <List>

                            {navVectGestion1.map((item) => (
                                <ListItem disablePadding key={item.title}>

                                    <ListItemButton
                                        color="inherit"
                                        key={item.title}
                                        component={NavLink}
                                        to={item.path}
                                        onClick={() => setOpen(false)}
                                        sx={{
                                            ":hover": {
                                                backgroundColor: '#e0e0e0'
                                            }
                                        }}
                                    >
                                        {item.icon}
                                        <Typography variant='subtitle1' sx={{ marginLeft: 2 }}  >
                                            {item.title}
                                        </Typography>
                                    </ListItemButton  >
                                </ListItem>

                            ))
                            }

                        </List>

                    </AccordionDetails>
                </Accordion>

                {/*  segundo menu acordeon */}
                <List>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<GridExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ backgroundColor: '#cfd8dc' }}
                        >
                            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1, ml: 1, mr: 1, justifyContent: 'center' }}>Expedientes</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{

                            backgroundColor: '#f1f8e9'

                        }} >
                            <List>
                                {navVectGestion2.map((item) => (
                                    <ListItem disablePadding key={item.title}>

                                        <ListItemButton
                                            color="inherit"
                                            key={item.title}
                                            component={NavLink}
                                            to={item.path}
                                            onClick={() => setOpen(false)}

                                            sx={{
                                                ":hover": {
                                                    backgroundColor: '#e0e0e0'
                                                }
                                            }}
                                        >
                                            {item.icon}
                                            <Typography variant='body1' sx={{ marginLeft: 2 }}  >
                                                {item.title}
                                            </Typography>
                                        </ListItemButton  >
                                    </ListItem>

                                ))
                                }
                            </List>

                        </AccordionDetails>
                    </Accordion>
                </List>
                {/*  menu 3-------------------------------- */}
                <List>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<GridExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ backgroundColor: '#cfd8dc' }}
                        >
                            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1, ml: 1, mr: 1, justifyContent: 'center' }} >Informes</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{

                            backgroundColor: '#f1f8e9'

                        }} >
                            <List>


                                {navVectGestion3.map((item) => (
                                    <ListItem disablePadding key={item.title}>

                                        <ListItemButton
                                            color="inherit"
                                            key={item.title}
                                            component={NavLink}
                                            to={item.path}
                                            onClick={() => setOpen(false)}

                                            sx={{
                                                ":hover": {
                                                    backgroundColor: '#e0e0e0'
                                                }
                                            }}
                                        >
                                        {/*     {item.icon} */}
                                            <Typography variant='body1' sx={{ marginLeft: 2 }}  >
                                                {item.title}
                                            </Typography>
                                        </ListItemButton  >
                                    </ListItem>

                                ))
                                }
                            </List>

                        </AccordionDetails>
                    </Accordion>
                </List>

                {/* ----------------------------------------------- */}


                {/* desde aq2ui */}
                {/*   {navVectGestion1.map((item) => (
                        <ListItem disablePadding key={item.title}>

                            <ListItemButton
                                color="inherit"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                sx={{
                                    ":hover": {
                                        bgColor: '#e0e0e0'
                                    }
                                }}
                            >
                                {item.icon}
                                <Typography variant='subtitle1' sx={{ marginLeft: 2 }}  >
                                    {item.title}
                                </Typography>
                            </ListItemButton  >
                        </ListItem>
                    ))
                    }
                    <Divider />
                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 3, ml: 1, mr: 1, justifyContent: 'center' }} >Expedientes</Typography>

                    {navVectGestion2.map((item) => (
                        <ListItem disablePadding key={item.title}>

                            <ListItemButton
                                color="inherit"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                sx={{
                                    ":hover": {
                                        bgColor: '#e0e0e0'
                                    }
                                }}
                            >
                                {item.icon}
                                <Typography variant='subtitle1' sx={{ marginLeft: 2 }}  >
                                    {item.title}
                                </Typography>
                            </ListItemButton  >
                        </ListItem>
                    ))
                    }
                    <Divider />
                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 3, ml: 1, mr: 1, justifyContent: 'center' }} >Informes</Typography>

                    {navVectGestion3.map((item) => (
                        <ListItem disablePadding key={item.title}>

                            <ListItemButton
                                color="inherit"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                sx={{
                                    ":hover": {
                                        bgColor: '#e0e0e0'
                                    }
                                }}
                            >
                                {item.icon}
                                <Typography variant='subtitle1' sx={{ marginLeft: 2 }}  >
                                    {item.title}
                                </Typography>
                            </ListItemButton  >
                        </ListItem>
                    ))
                    }
                    <Toolbar />
                  */}

                {/*hasta aqui  */}
                <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, bgcolor: "#e8eaf6" }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 1, ml: 1, mr: 1, justifyContent: 'center' }} ></Typography>
                    {navVectLinks.slice(1).map((item) => (
                        <ListItem disablePadding key={item.title}>

                            <ListItemButton
                                color="inherit"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                sx={{
                                    ":hover": {
                                        bgColor: '#e0e0e0'
                                    }
                                }}
                            >
                              {/*   {item.icon} */}
                                <Typography variant='body2' sx={{ marginLeft: 1 }}  >
                                    {item.title}
                                </Typography>
                            </ListItemButton  >
                        </ListItem>
                    ))

                    }
                </Box>
            </List>
        </Box>

    )
}

NavListMenu.propTypes = {
    navVectLinks: PropTypes.array,
    navVectGestion1: PropTypes.array,
    navVectGestion2: PropTypes.array,
    navVectGestion3: PropTypes.array,
    NavLink: PropTypes.any,
    setOpen: PropTypes.any
}