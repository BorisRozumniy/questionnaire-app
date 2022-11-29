import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { AnswerType, IQuestion } from '../../@types/question';
import { useOnClickOutside } from '../../useOnClickOutside';
import { Button } from '../Styled/Button';
import { Input } from '../Styled/Input';
import {
  CloseButton,
  Heading,
  ModalFormBlock,
  ModalWindow,
  ModalWrapper,
} from './styles';

export const Modal = () => {
  // const { modalIsOpen, toggleModal, temporaryQuestion, saveEditedQuestion } =
  //   useContext(Context) as ContextType;

  const [formData, setFormData] = useState({} as IQuestion);

  // useEffect(() => {
  //   setFormData(temporaryQuestion);
  // }, [temporaryQuestion]);

  const handleForm = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
  };

  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, () => {
    // toggleModal(false);
  });

  // if (modalIsOpen)
  return (
    <ModalWrapper>
      <ModalWindow ref={wrapperRef}>
        <Heading>Modal</Heading>
        <CloseButton onClick={() => console.log('toggleModal(false)')}>
          x
        </CloseButton>
        <ModalFormBlock onSubmit={(e) => handleSave(e)}>
          <Input
            defaultValue={formData.questionText}
            onChange={handleForm}
            type="text"
            id="questionText"
          />

          <select
            value={formData.answerType}
            onChange={handleForm}
            id="answerType"
          >
            <option value={AnswerType.text}>text</option>
            <option value={AnswerType.data}>data</option>
            <option value={AnswerType.oneOfTheList}>one of the list</option>
            <option value={AnswerType.aFewFromTheList}>
              a few from the list
            </option>
            <option value={AnswerType.scale}>scale</option>
          </select>
          <Button disabled={formData === undefined ? true : false}>
            Save changes
          </Button>
        </ModalFormBlock>
      </ModalWindow>
    </ModalWrapper>
  );
  return null;
};
