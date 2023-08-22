import { CommonProps } from '@mui/material/OverridableComponent';
import { SxProps, Theme } from '@mui/material';

type StyleProps = CommonProps['style'] | SxProps<any>

const textFieldStyles: CommonProps['style'] = {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
};

const cardStyles: StyleProps = {
    p: 1,
    margin: 1,
    alignItems: 'center',
    borderRadius: 2
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