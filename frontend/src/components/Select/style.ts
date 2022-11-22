import { theme } from '../../theme';

export const customStyles = {
  container: (provided: object) => ({
    ...provided,
    width: '100%',
    border: `solid 1px ${theme.colors.strong}`,
    borderRadius: '3px',
    // textTransform: 'capitalize',
  }),
  control: (provided: object, state: { isFocused: boolean }) => ({
    ...provided,
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.black,
    border: 'none',
    transition: 'all 0.3s',
    borderRadius: '3px',
    boxShadow: state.isFocused ? `${theme.colors.outline} 0 0 0 3px` : '',
  }),
  option: (provided: object, state: { isFocused: boolean }) => ({
    ...provided,
    padding: '6px 12px',
    backgroundColor: state.isFocused ? theme.colors.main : theme.colors.white,
    color: !state.isFocused ? theme.colors.black : theme.colors.white,
    // textTransform: 'capitalize'
  }),
  dropdownIndicator: (provided: object) => ({
    ...provided,
    color: theme.colors.main,
  }),
  indicatorSeparator: (provided: object) => ({
    ...provided,
    backgroundColor: theme.colors.strong,
  }),
};
