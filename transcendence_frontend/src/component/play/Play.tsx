import React from 'react';
import styles from './playbutton.module.css';
import GlowButton from './Button';
import Link from 'next/link';

const PlayButton: React.FC = () => {
  return (
    <div className={styles.all}>
      <div className={styles.play}>
        <Link href="/dashboard">
          <GlowButton />
        </Link>
      </div>
    </div>
  );
};

export default PlayButton;
