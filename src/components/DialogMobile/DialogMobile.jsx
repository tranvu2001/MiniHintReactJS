import {React, forwardRef, useState} from 'react'
import {  Dialog, List, ListItem, ListItemText, Slide, Button} from '@mui/material'
import { Link } from 'react-router-dom'
import {styled} from '@mui/material/styles'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const DialogMobile = ({open, handleClose, list, breakpoint, id, name}) => {

    const ButtonClose = styled(Button) ({
        position: 'absolute',
        right: 0,
        fontSize: '18px',
        padding: '10px',
    })

  return (
    <>
        <Dialog
                open={open}
                onClose={() => handleClose()}
                maxWidth={"lg"}
                fullWidth
                TransitionComponent={Transition}
                keepMounted
            >
                <List>
                    {list.map((item, index) => (
                        <ListItem
                            className='w-full text-lg'
                            key={index}
                        >
                            <ListItemText
                                // primary={item.categoryName}
                            >
                                <Link to={`/${breakpoint}/${item[id]}`} className='text-lg'>
                                    {item[name]}
                                </Link>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
                <ButtonClose onClick={handleClose}>X</ButtonClose>
            </Dialog>
    </>
  )
}

export default DialogMobile