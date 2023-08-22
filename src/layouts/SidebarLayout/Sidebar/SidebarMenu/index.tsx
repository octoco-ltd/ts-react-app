import { useContext, useState } from 'react';

import {
  Cancel,
  Check,
  EngineeringOutlined, Error, ErrorOutline,
  ExpandLess,
  ExpandMore,
  HomeOutlined,
  Logout,
  QuestionMarkOutlined,
  UpcomingOutlined
} from '@mui/icons-material';
import { Box, Button, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/context/SidebarContext';
import pages from '../../../../router/routes';
import UserInfo from 'src/components/UserInfo/UserInfo';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useAuth } from 'src/features/authentication/context/AuthContext';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemHeadingColor};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`,
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.palette.text.primary};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.sidebar.menuItemIconColor};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.sidebar.menuItemIconColor};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${theme.sidebar.menuItemBgActive};
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.sidebar.menuItemIconColorActive};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create(['transform', 'opacity'])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`,
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  const [openStatus, setOpenStatus] = useState(true);
  const authService = useAuth()

  const handleLogout = () => {
    try {
      authService.signOut()
  } catch (err) {
      console.error(err);
  }
  }

  return (
    <>
      <MenuWrapper>
        <List component='div'>
          <SubMenuWrapper>
                <List component='div'>
                    <ListItem component='div'>
                        <Box textAlign='center'>
                            <UserInfo />
                        </Box>
                    </ListItem>
                    <ListItem component='div'>
                        <Box textAlign='center'>
                          <Button
                            disableRipple
                            onClick={handleLogout}
                            startIcon={<Logout />}
                          >
                            Sign Out
                          </Button>
                        </Box>
                    </ListItem>
                </List>
          </SubMenuWrapper>
          <SubMenuWrapper>
            <List component='div'>
              <ListItem component='div'>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to='/home'
                  startIcon={<HomeOutlined />}
                >
                  Home
                </Button>
              </ListItem>
              <ListItem component='div'>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to='/profile/view/current-user'
                  startIcon={<PermIdentityOutlinedIcon />}
                >
                  Profile
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <ListItemButton
          onClick={()=>setOpenStatus(!openStatus)}
        >
          <ListSubheader component='div' disableSticky>
              Status
          </ListSubheader>   
          {openStatus ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openStatus} timeout="auto" unmountOnExit>
          <SubMenuWrapper>
              <List component='div'>
              <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to={pages.status.statusSuccess.path}
                    startIcon={<Check />}
                  >
                    Success
                  </Button>
                </ListItem>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to={pages.status.statusFailure.path}
                    startIcon={<Error />}
                  >
                    Failure
                  </Button>
                </ListItem>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to={pages.status.statusCancel.path}
                    startIcon={<Cancel />}
                  >
                    Cancel
                  </Button>
                </ListItem>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to={pages.status.statusComingSoon.path}
                    startIcon={<UpcomingOutlined />}
                  >
                    Coming Soon
                  </Button>
                </ListItem>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to={pages.status.statusMaintenance.path}
                    startIcon={<EngineeringOutlined />}
                  >
                    Maintenance
                  </Button>
                </ListItem>
                <ListItem component='div'>
                  <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to={pages.status.status404.path}
                      startIcon={<QuestionMarkOutlined />}
                  >
                    Status 404
                  </Button>
                </ListItem>
                <ListItem component='div'>
                  <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to={pages.status.status500.path}
                      startIcon={<ErrorOutline />}
                  >
                    Status 500
                  </Button>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </Collapse>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
