import classnames from 'classnames/bind'
import styles from './ModalProduct.module.css'
import { forwardRef } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const cx = classnames.bind(styles)

const ModalProduct = (open, close) => {
    

    // const handleClose = () => {
    //     setOpen(fasle)
    // }

    return (
        <div className={cx('modal-product')}>
            <Dialog 
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={close}

            >
                <DialogTitle >{'Day la Dialog'}</DialogTitle>
                <DialogContent >
                    Day la content cua Dialog
                </DialogContent>
                <DialogActions >
                    <Button >Nut No</Button>
                    <Button >Nut Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ModalProduct