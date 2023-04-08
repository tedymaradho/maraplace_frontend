import { CSSProperties } from 'react';
import { GridLoader } from 'react-spinners';

const Loading = () => {
  const override: CSSProperties = {
    borderColor: 'red',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <GridLoader
      color={'#748f71'}
      loading={true}
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default Loading;
