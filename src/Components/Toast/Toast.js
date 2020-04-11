import React, {  } from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'




export default ({ open, handleClose, severity, children }) => (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={2000} >
        
        <Alert variant="filled" severity={severity} onClose={handleClose}>{children}</Alert>

    </Snackbar>
)