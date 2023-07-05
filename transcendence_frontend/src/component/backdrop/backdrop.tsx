import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import styles from './backdrop.module.css';
import FullChannel from './FullChannel';
import EnterText from './EnterText';
import TextSend from './TextSend';
import { useEffect, useState, useRef } from 'react';
import { ChatContext } from './ChatContext';
import { FriendsOnline } from './FriendsOnline';
import io, { Socket } from 'socket.io-client'; // Import socket.io-client and Socket type

type Anchor = 'right';

import { Dispatch, SetStateAction } from 'react';

interface IChatContext {
  messages: string[];
  setMessages: Dispatch<SetStateAction<string[]>>;
}

export default function Backdrop() {
  const [messages, setMessages] = useState<string[]>([]);

  const value: IChatContext = { messages, setMessages };
  const [state, setState] = React.useState({
    right: false,
  });

  const socketRef = useRef<Socket | null>(null); // Use Socket type for the socketRef ref

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    socketRef.current.on('connect', () => {
      console.log('connecté');
    });

    socketRef.current.on('message', function (id, data) {
      setMessages((prevMessages) => [...prevMessages, `<p> ${id} :  ${data} </p>`]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <ChatContext.Provider value={value}>
      <div>
        {(['right'] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              sx={{
                marginLeft: '-20%',
                fontSize: '12px',
                fontWeight: '600',
                color: '#ffffff6b',
                '@media screen and (width < 1000px)': {
                  fontSize: '8px',
                  marginLeft: '-35%',
                  marginTop: '5%',
                },
                '&:hover': {
                  color: '#f0f8ff',
                },
              }}
            >
              CHAT
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {/* {list(anchor)} */}
              <Box
                className="inside_chat"
                sx={{
                  width: '500px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'black',
                  '@media screen and (width < 1500px)': {
                    width: '350px',
                  },
                }}
              >
                {/* ############## INSIDE BACKDROP ############### */}
                <FriendsOnline />
                {/* ############## INSIDE TEXT AREA ############### */}
                <div className={styles.channel_tchat}>
                  <div className={styles.title}>
                    <FullChannel />
                  </div>
                  <div className={styles.tchat}>
                    <div className={styles.textsendermodule}>
                      {messages.reverse().map((message, i) => (
                        <TextSend key={i} message={message} user={null} />
                      ))}
                    </div>
                  </div>
                  <div className={styles.enter_text}></div>
                  <EnterText />
                </div>
              </Box>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    </ChatContext.Provider>
  );
}