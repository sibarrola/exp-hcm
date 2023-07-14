import { ThemeProvider } from "@emotion/react"
/* esto es algo como el estilo normalize.css */
import { CssBaseline } from "@mui/material"
import {colortema} from './';
// eslint-disable-next-line react/prop-types
export const AppTheme=({children})=>{
    return (
        // eslint-disable-next-line no-undef
        <ThemeProvider theme={colortema}>
            <CssBaseline/>
            {/* aqui va a venir el app, en el childre */}
        {children}
        </ThemeProvider>
    )
}