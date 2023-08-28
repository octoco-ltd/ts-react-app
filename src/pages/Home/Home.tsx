import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { HomeWrapper } from './Home.styles';
// import ListPokemon from 'src/features/pokemon/components/listPokemon/ListPokemon';
import { Dashboard } from 'src/features/dashboard';
import { IComponentList } from 'src/features/dashboard/models/dashboardTypes';

const HomePage = () => {    

    const componentList: IComponentList = {
        //Here you can add any component that need to render
        feature1: ()=><>Feature 1</>,
        feature2: ()=><>Feature 2</>,
        feature3: ()=><>Feature 3</>,
        feature4: ()=><>Feature 4</>,
      };

      const initialLayouts: ReactGridLayout.Layouts = {
        //Here you set the layout of these components
        xs: [
          { i: 'feature1', x: 0, y: 0, w: 1, h: 2 },
          { i: 'feature2', x: 1, y: 0, w: 3, h: 2 },
          { i: 'feature3', x: 4, y: 0, w: 1, h: 2 },
          { i: 'feature4', x: 0, y: 2, w: 2, h: 2 },
        ]
      };

      
    return (
        <HomeWrapper>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <Container maxWidth='lg'>
                <Dashboard canEdit={true} componentList={componentList} initialLayouts={initialLayouts} heading='Dashboard' page={'dashboard'}/>
            </Container>
        </HomeWrapper>
    );
};

export default HomePage;