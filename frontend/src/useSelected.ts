import { useState } from "react"

export const useSelectedMultiple = (initialValue: string[] = []) => {
    const [selectedItems, setSelectedItems] = useState(initialValue)
    const toggleSelectedItems = (item: string) => {
        if (selectedItems.includes(item))
            setSelectedItems([item])
        else
            setSelectedItems(selectedItems.filter(currentItem => currentItem === item))
    }
    return [selectedItems, toggleSelectedItems] as const
}

export const useSelectedOne = (initialValue = '') => {
    const [selectedItem, setSelectdItem] = useState(initialValue)
    const toggleSelectedItem = (item: string) => {
        setSelectdItem(item === selectedItem ? '' : item)
    }
    return [selectedItem, toggleSelectedItem] as const
}