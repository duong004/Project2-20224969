import React, { useState } from 'react';
import ProductForm from '../../components/Manage_product/ProductForm.js';
import { notify } from '../../components/Notification/notification';

const ProfilePictureOptions = ({ image, reload }) => {
  const [on, setOn] = useState(false);

  const handleChooseProfilePicture = () => {
    setOn(a => !a);
  };

  return (
    <>
      {on ? (
        <ProductForm
          profile={true}
          turnoff={() => {
            setOn(false);
          }}
          refresh={reload}
        />
      ) : (
        <div style={styles.container}>
          <button style={styles.button}>
            <a href={image} target="_blank" rel="noopener noreferrer">
              <span style={styles.icon}>👤</span> See profile picture
            </a>
          </button>
          <button style={styles.button} onClick={handleChooseProfilePicture}>
            <span style={styles.icon}>🖼️</span> Choose profile picture
          </button>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    backgroundColor: '#181818',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    position: 'absolute',
    zIndex: 10000,
    top: '207px',
    left: '20%',
  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px',
  },
};

export default ProfilePictureOptions;