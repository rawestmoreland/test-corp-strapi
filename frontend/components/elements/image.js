import { getStrapiMedia } from 'utils/media';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { mediaPropTypes } from 'utils/types';

const NextImage = ({ media, ...props }) => {
  const { url, alternativeText, width, height } = media.data.attributes;
  // {console.log('*********** Inside NextImage **************')}
  // {console.log('url is:', url)}
  // {console.log('alternativeText: ', alternativeText)}
  // {console.log('width: ', width)}
  // {console.log('height: ', height)}

  const loader = ({ src, width }) => {
    return getStrapiMedia(src, width);
  };

  // The image has a fixed width and height
  if (props.width && props.height) {
    return (
      <Image loader={loader} src={url} alt={alternativeText || ''} {...props} />
    );
  }

  // The image is responsive, but note: if you used layout='fixed' you can see the full size of the image
  return (
    <Image
      loader={loader}
      layout="responsive"
      width={props.width || width || '100%'}
      height={props.height || height || '100%'}
      objectFit={props.cover ? 'cover' : 'contain'}
      src={url}
      alt={alternativeText || ''}
    />
  );
};

Image.propTypes = {
  media: mediaPropTypes,
  className: PropTypes.string,
};

export default NextImage;
