import { Edit, EmailRounded, Phone, Settings } from '@mui/icons-material';
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
    Box,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserAvatar from 'src/components/avatar/UserAvatar';
import useGetUser from 'src/hooks/useGetUser';

export default function ViewProfile() {
    const { userId } = useParams();
    const { isCurrentUser, validUser, user } = useGetUser({userId: userId ?? ''});
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileEdit = () => {
        navigate(`/profile/edit/${userId}`)
    };

    if(!validUser){
        return (<>NOT A VALID USER</>)
    }

    return (
        <>
            <Paper elevation={10} sx={{ width: '100%', p: 5 }}>
                
                <Grid item xs={12}>
                    <Box display='flex' justifyContent='center' alignItems='center' pb={2}>
                        <Tooltip arrow placement='top' title='Edit Basic Profile'>
                            <IconButton
                                color='primary'
                                onClick={handleProfileEdit}
                                sx={{ marginRight: 3 }}
                            >
                                <Edit fontSize='large' />
                            </IconButton>
                        </Tooltip>
                        <UserAvatar user={user} />
                        <Tooltip arrow placement='top' title='Edit Settings'>
                            <IconButton
                                color='primary'
                                sx={{ marginLeft: 3 }}
                                id='basic-button'
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup='true'
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <Settings fontSize='large' />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id='basic-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                {' '}
                                <ListItemIcon>
                                    <KeyTwoToneIcon fontSize='medium' />
                                </ListItemIcon>
                                Reset Password
                            </MenuItem>
                        </Menu>
                    </Box>
                </Grid>
                {/* <Grid item xs={12}>
                    {auth0user?.user?.name !== auth0user?.user?.email && (
                        <Typography variant='h3' textAlign={'center'}>
                            {userLoading ? <>...</> : user?.value.name ?? ''}
                        </Typography>
                    )}
                    <Typography variant='body2' textAlign={'center'}>
                        {userLoading ? <>...</> : user?.value.id ?? ''}
                    </Typography>
                </Grid> */}
                {/* <Grid item xs={12}>
                    <Box display='flex' justifyContent='center' alignItems='center' pt={2}>
                        <Stack spacing={0.5}>
                            <Stack direction='row' spacing={1.5} alignItems='center'>
                                <EmailRounded fontSize={'medium'} />
                                <Typography variant='h6' textAlign={'center'}>
                                    {userLoading ? <>...</> : user?.value.email ?? '--'}
                                </Typography>
                            </Stack>
                            <Stack direction='row' spacing={1.5} alignItems='center'>
                                <Phone fontSize={'medium'} />
                                <Typography variant='h6' textAlign={'center'}>
                                    {userLoading ? <>...</> : user?.value.cellphone ?? '--'}
                                </Typography>
                            </Stack>
                            {userLoading ? (
                                <>...</>
                            ) : (
                                kycSubmitted &&
                                !kycCompleted && (
                                    <Stack direction='row' spacing={1.5} alignItems='center'>
                                        <VerifiedIcon fontSize={'medium'} />
                                        <Typography variant='h6' textAlign={'center'}>
                                            KYC Pending
                                        </Typography>
                                    </Stack>
                                )
                            )}
                        </Stack>
                    </Box>
                </Grid> */}
            </Paper>
        </>
    );
}
