import React from 'react';
import Image from 'next/image';
import styles from './UploadImage.module.css';

const ImageUpload = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer} style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <div className="flex items-center gap-3.5 max-w-full w-[345px]">
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                loading="lazy"
                src="/profile.png"
                alt='User Profile'
                height={150} width={150}
                className="grow shrink-0 aspect-auto basis-0 w-fit left-12"
                style={{ zIndex: 1, position: 'relative' }}
              />
            </div>
            <div className={styles.zoomButtons}>
              <div className={styles.zoomButton}>
                <button>
                  <Image
                    loading="lazy"
                    alt='Zoom in'
                    width={28} height={28}
                    src='/magnifying-glass-plus.svg'
                    className={styles.zoomButtonGrow}
                    style={{ zIndex: 3, position: 'relative' }}
                  />
                </button>
              </div>
              <div className={styles.zoomButton}>
                <button>
                  <Image
                    loading="lazy"
                    alt='Zoom in'
                    width={28} height={28}
                    src='/magnifying-glass-minus.svg'
                    className={styles.zoomButtonGrow}
                    style={{ zIndex: 3, position: 'relative' }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.deleteAvatarBtn}>
          Delete Avatar
        </button>
        <div className={`flex gap-4 mt-4 max-md:mt-10 ${styles.uploadButtonContainer}`}>
          <div className={`flex flex-col text-black ${styles.uploadField}`}>
            <div className="text-base">Upload Image</div>
            <button className={`${styles.chooseBtn} ${styles.chooseButton}`}>
              Choose file
            </button>
          </div>
          <div className={`${styles.inputField} ${styles.fileInput}`}>
            No file chosen...
          </div>
        </div>
        <button className={`${styles.changeAvatar} ${styles.changeButton}`}>
          Change Avatar
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
