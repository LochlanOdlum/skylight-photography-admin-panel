import { useState, useEffect } from 'react';

import { fetchSecureImage } from '../../api/ordersApi';

import './ImageDownload.scss';

const ImageDownload = ({ path, paddingBottom }) => {
  const [imageObjectURL, setImageObjectURL] = useState(null);

  useEffect(() => {
    let objectURL;

    const fetchImage = async () => {
      objectURL = await fetchSecureImage(path);
      setImageObjectURL(objectURL);
    };

    fetchImage();

    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [path]);

  return <div style={{ backgroundImage: `url('${imageObjectURL}')`, paddingBottom }} className='mpp-photo-img' />;
};

export default ImageDownload;
