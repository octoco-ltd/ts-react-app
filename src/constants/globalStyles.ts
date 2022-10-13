import { CommonProps } from '@mui/material/OverridableComponent';
import { SxProps, Theme } from '@mui/material';

type StyleProps = CommonProps['style'] | SxProps<any>

const textFieldStyles: CommonProps['style']  = {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
};

const cardStyles: StyleProps = {
    p: 10,
    margin: 5,
    alignItems: 'center',
    borderRadius: 10
};

const globalStyles = {
    textField: {
        ...textFieldStyles,
    },
    card: {
        ...cardStyles
    }
};

export default globalStyles;