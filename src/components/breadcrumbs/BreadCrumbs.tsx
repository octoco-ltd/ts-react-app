import { Breadcrumbs as MuiBreadCrumb } from '@mui/material';
import routes from 'src/router/router';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

function Breadcrumbs() {
    const breadcrumbs = useBreadcrumbs(routes);

    // const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     event.preventDefault();
    //     console.log(event);
    //     console.info('You clicked a breadcrumb.');
    // };

    return (
        // <div role='presentation' onClick={handleClick}>
        <MuiBreadCrumb aria-label='breadcrumb'>
            {breadcrumbs.map(({ match, breadcrumb }: any, index: number) => (
                <div key={index}>{breadcrumb}</div>
            ))}
        </MuiBreadCrumb>
        // </div>
    );
}

export default Breadcrumbs;

