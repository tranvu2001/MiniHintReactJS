import { Button } from '@mui/material'
import {styled} from '@mui/material/styles'


export const ButtonStyle = styled(Button)(
    ({
    padding = '15px 70px',
    fontsize = '1.4rem',
    border = '1px solid #0a6cdc',
    cl = '#fff',
    backgroundcolor = '#0a6cdc',
    borderradius = '50px',
    cursor = 'pointer',
    marginleft = '90px',
    margintop = '10px'
    }) => {

    return {
        padding: padding,
        fontSize: fontsize,
        border: border,
        marginleft: marginleft,
        color: cl,
        backgroundColor: backgroundcolor,
        borderRadius: borderradius,
        cursor: cursor,
        marginTop: margintop,
        '&:hover': {
            color: backgroundcolor
        }
    }
})

export const CustomButton = styled(Button)(
    ({ 
        padding = '15px 70px',
        fontSize = '1.4rem',
        border = '1px solid #0a6cdc',
        color = '#fff',
        backgroundColor = '#0a6cdc',
        borderRadius = '50px',
        cursor = 'pointer' }) => {
      return {
        padding: padding,
        fontSize: fontSize,
        border: border,
        color: color,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        cursor: cursor,
        '&:hover': {
            color: backgroundColor
        }
      };
    }
  );

