import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnswerType, IQuestion, ContextType } from "../../@types/question";
import { Context } from "../../context/context";
import { useOnClickOutside } from "../../useOnClickOutside";
import { Button } from "../Styled/Button";
import { Input } from "../Styled/Input";
import {
  CloseButton,
  Heading,
  ModalFormBlock,
  ModalWindow,
  ModalWrapper,
} from "./styles";

export const Modal = () => {
  const { modalIsOpen, toggleModal, editingQuestionData, saveEditedQuestion } =
    useContext(Context) as ContextType;

  const [formData, setFormData] = useState(editingQuestionData as IQuestion);

  useEffect(() => {
    setFormData(editingQuestionData);
  }, [editingQuestionData]);

  const handleForm = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSave = (e: FormEvent, formData: IQuestion | any) => {
    e.preventDefault();
    saveEditedQuestion(formData);
    toggleModal(false);
  };

  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, () => {
    toggleModal(false);
  });

  if (modalIsOpen)
    return (
      <ModalWrapper>
        <ModalWindow ref={wrapperRef}>
          <Heading>Modal</Heading>
          <CloseButton onClick={() => toggleModal(false)}>x</CloseButton>
          <ModalFormBlock onSubmit={(e) => handleSave(e, formData)}>
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
