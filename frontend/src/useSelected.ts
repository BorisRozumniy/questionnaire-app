import { useState } from "react"
import { AnswerOption } from "./@types/respondent"

export const useSelectedMultiple = (initialValue: AnswerOption[] = []) => {
    const [selectedOptions, setSelectedOptions] = useState(initialValue)
    const toggleOrAddOptions = (option: AnswerOption) => {

        const alreadySelected = selectedOptions.some(({ id }) => id === option.id)

        if (alreadySelected)
            setSelectedOptions(selectedOptions.filter(({ id }) => id !== option.id))
        else
            setSelectedOptions([...selectedOptions, option])
    }
    return [selectedOptions, toggleOrAddOptions] as const
}

export const useSelectedOne = (initialValue = '') => {
    const [selectedItem, setSelectdItem] = useState(initialValue)
    const toggleSelectedItem = (option: string) => {
        setSelectdItem(option === selectedItem ? '' : option)
    }
    return [selectedItem, toggleSelectedItem] as const
}
