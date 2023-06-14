import React from 'react'
import styles from './EnterText.module.css'
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EnterText:React.FC = () =>{

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={styles.container}>
        <div className={styles.input}>
            <input type="text" placeholder="Enter your message here..." style={{
                width: '100%',
                height: '100%',
                border: 'none',
            }}/>
        </div>
        <button className={styles.send_text} onClick={handleClick}>
            <SendIcon style={{}}/>
        </button>   
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              This is a success message!
            </Alert>
        </Snackbar>
    </div>
  )
}

export default EnterText
