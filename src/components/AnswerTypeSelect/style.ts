export const customStyles = {
    option: (provided: object, state: any) => ({
        ...provided,
        borderBottom: "1px dotted pink",
        color: state.isSelected ? "red" : "blue",
        padding: "6px 12px",
    }),
    control: (provided: object, state: any) => ({
        ...provided,
        fontFamily:
            '-apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        fontSize: "14px",
        fontWeight: 600,
        color: "#333",
        borderRadius: "3px",
        backgroundColor: "rgb(255, 255, 255)",
        border: "solid 1px rgb(46, 164, 79)",
        transition: "all 0.3s",
        boxShadow: state.isFocused && "rgba(46, 164, 79, .4) 0 0 0 3px",
    }),
    singleValue: (provided: object, state: any) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";

        return { ...provided, opacity, transition };
    },
};
