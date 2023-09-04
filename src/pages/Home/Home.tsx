import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { HomeWrapper } from './Home.styles';
// import ListPokemon from 'src/features/pokemon/components/listPokemon/ListPokemon';
import { IDashboardComponent } from 'src/features/dashboard/models/dashboardTypes';
import ListPokemon from 'src/features/pokemon/components/listPokemon/ListPokemon';
import AreaChartComponent from 'src/components/charts/AreaChartComponent';
import BarChartComponent from 'src/components/charts/BarChartComponent';
import PieChartComponent from 'src/components/charts/PieChartComponent';
import { Dashboard } from 'src/features/dashboard';

const HomePage = () => {

  const componentList: IDashboardComponent = {
    //Here you can add any component that need to render
    ListPokemon: { component: <ListPokemon /> },
    AreaChartComponent: { component: <AreaChartComponent /> },
    BarChartComponent: { component: <BarChartComponent /> },
    PieChartComponent: { component: <PieChartComponent />, showBorder: false },
  };

  const initialLayouts: ReactGridLayout.Layouts = {
    //Here you set the layout of these components
    lg: [

      {
        'w': 24,
        'h': 14,
        'x': 0,
        'y': 14,
        'i': 'ListPokemon',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 6,
        'y': 0,
        'i': 'AreaChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 15,
        'y': 0,
        'i': 'BarChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 6,
        'h': 14,
        'x': 0,
        'y': 0,
        'i': 'PieChartComponent',
        'moved': false,
        'static': false
      }

    ], md: [

      {
        'w': 24,
        'h': 14,
        'x': 0,
        'y': 14,
        'i': 'ListPokemon',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 6,
        'y': 0,
        'i': 'AreaChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 15,
        'y': 0,
        'i': 'BarChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 6,
        'h': 14,
        'x': 0,
        'y': 0,
        'i': 'PieChartComponent',
        'moved': false,
        'static': false
      }

    ], sm: [

      {
        'w': 24,
        'h': 14,
        'x': 0,
        'y': 14,
        'i': 'ListPokemon',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 6,
        'y': 0,
        'i': 'AreaChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 15,
        'y': 0,
        'i': 'BarChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 6,
        'h': 14,
        'x': 0,
        'y': 0,
        'i': 'PieChartComponent',
        'moved': false,
        'static': false
      }
    ], xs: [
      {
        'w': 24,
        'h': 14,
        'x': 0,
        'y': 14,
        'i': 'ListPokemon',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 6,
        'y': 0,
        'i': 'AreaChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 15,
        'y': 0,
        'i': 'BarChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 6,
        'h': 14,
        'x': 0,
        'y': 0,
        'i': 'PieChartComponent',
        'moved': false,
        'static': false
      }

    ], xxs: [
      {
        'w': 24,
        'h': 14,
        'x': 0,
        'y': 14,
        'i': 'ListPokemon',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 6,
        'y': 0,
        'i': 'AreaChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 9,
        'h': 14,
        'x': 15,
        'y': 0,
        'i': 'BarChartComponent',
        'moved': false,
        'static': false
      },
      {
        'w': 6,
        'h': 14,
        'x': 0,
        'y': 0,
        'i': 'PieChartComponent',
        'moved': false,
        'static': false
      }

    ]
  };


  return (
    <HomeWrapper>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Container maxWidth='lg'>
        <Dashboard canEdit={true} componentList={componentList} initialLayouts={initialLayouts} heading='Home' page={'BaseRepoDashboard'} />
      </Container>
    </HomeWrapper>
  );
};

export default HomePage;