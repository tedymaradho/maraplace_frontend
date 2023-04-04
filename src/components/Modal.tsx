import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setMsgHide } from '../redux/msgSlice';

const Modal = (props: any) => {
  const { title, content, btnContent } = props;

  const dispatch = useDispatch();

  const closeHandler = () => dispatch(setMsgHide());

  return (
    <>
      <div className="modal__backdrop"></div>
      <div className="modal">
        <div className="modal__header">
          <h1 className="modal__title">{title}</h1>
          <AiOutlineClose
            className="modal__close--icon"
            onClick={closeHandler}
          />
        </div>
        <div className="modal__main">
          <p className="modal__content">{content}</p>
        </div>
        <div className="modal__footer">
          <button className="modal__button" onClick={closeHandler}>
            {btnContent}
          </button>
        </div>
      </div>
    </>
  );
};
export default Modal;
