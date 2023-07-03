import React, { useContext, useState } from 'react'
import styles from './EnterText.module.css'
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ChatContext } from './ChatContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EnterText:React.FC = () =>{

  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    throw new Error("Vous devez utiliser le contexte du chat à l'intérieur du fournisseur de chat");
  }

  const { setMessages } = chatContext;

  const [messageText, setMessageText] = useState(''); // nouvel état pour le texte de message

  const handleClick = () => {
    setMessages(prevMessages => [messageText, ...prevMessages]);  // Ajoutez le nouveau message au début du tableau
    setMessageText(''); // réinitialiser le texte de message
    setOpen(true);
  };
  
  


  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={styles.container}>
    <div className={styles.input}>
      <input type="text" placeholder="Enter your message here..."
        value={messageText}
        onChange={event => setMessageText(event.target.value)}
        style={{ width: '100%', height: '100%', border: 'none' }}/>
    </div>
    <button className={styles.send_text} onClick={handleClick}>
      <SendIcon />
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
