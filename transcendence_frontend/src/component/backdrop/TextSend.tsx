import React, { useContext, useEffect, useState } from 'react'
import styles from './TextSend.module.css'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import { User } from '../../../../transcendence_backend/src/user/user.entity';
import axios from 'axios';
import { ChatContext } from './ChatContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  interface TextSendProps {
    message: string;
    user: User | null;
  }

const TextSend:React.FC<TextSendProps> = ({message}) =>{

  const currentTime = new Date();
  const timeString = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    throw new Error("Vous devez utiliser le contexte du chat à l'intérieur du fournisseur de chat");
  }

  const { messages } = chatContext;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>('http://localhost:4000/user', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };

    fetchUser();
  }, []);
  
  return (
    <div className={styles.container}>
        <div className={styles.avatar}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                >
                <Link href="/profil">
                  <Avatar alt="Remy Sharp" src={user?.imageUrl} />
                </Link>
            </StyledBadge>
        </div>
        <div className={styles.text}>
        <div className={styles.text_in}>
          <div className={styles.inner_name}>
            <p>{user?.username}</p>
          </div>
          <div className={styles.inner_text}>
            <p>{message}</p>
          </div>
        </div>
        <div className={styles.time}>
          <p>{timeString}</p>
        </div>
        </div>
    </div>
  )
}

export default TextSend