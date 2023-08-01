import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import { Avatar, Box, Stack, Tooltip, Typography, styled } from '@mui/material';
import { useSelector } from 'react-redux';

const CardWrapper = styled(Box)(
    () => `
            height: 113px;
            width: 262px;
            display: flex;
          `,
);

const UserInfo = () => {
    const user = useSelector((state: any) => state.user); //TODO: ADD IS LOADING AND any ONCE WE KNOW WHAT THE USE WILL BE

    return (
        <CardWrapper sx={{ mb: 3 }}>
            <Stack
                direction='column'
                spacing={1.5}
                alignItems='center'
                sx={{
                    width: '100%',
                }}
            >
                <Box>
                    <Avatar
                        src={user?.user?.picture ?? ''}
                        imgProps={{
                            sx: {
                                referrerpolicy: 'no-referrer',
                                maskImage:
                                    'radial-gradient(circle, white 66%, rgba(255, 254, 255, 0.5) 10%)',
                            },
                        }}
                        sx={{
                            alt: 'Profile Picture of User',
                            height: 65,
                            width: 65,
                        }}
                    />
                </Box>
                <Stack spacing={0.5}>
                    <Stack>
                        <Typography variant='h6'>{user?.user?.name}</Typography>
                        {user?.user?.name !== user?.user?.email && (
                            <Typography variant='body1'>{user?.user?.email}</Typography>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </CardWrapper>
    );
};

export default UserInfo;
