
import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import TopBar from './TopBar';
import Widget from './Widget';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { IDashboardComponent, ILayoutKey } from '../models/dashboardTypes';
import ControlCameraRoundedIcon from '@mui/icons-material/ControlCameraRounded';
import { getStorageItem, setStorageItem } from 'src/utils/browserStorage';
const ResponsiveGridLayout = WidthProvider(Responsive);

//TODO: add item and remove items from dashboard

interface DashboardProps {
  canEdit?: boolean //whether the user can move / remove /add the components around 
  initialLayouts: ReactGridLayout.Layouts
  componentList: IDashboardComponent
  heading: string
  page: string
  autoSave?: boolean
}

export default function Content({ initialLayouts, canEdit = true, componentList, heading, page, autoSave = false }: DashboardProps) {
  const [items, setItems] = useState<any>(Object.keys(componentList));

  const onRemoveItem = (itemId: any) => {
    setItems(items.filter((i: any) => i !== itemId));
  };

  const onAddItem = (itemId: any) => {
    setItems([...items, itemId]);
  };

  const layoutKeys: ILayoutKey[] = Object.keys(initialLayouts) as ILayoutKey[];

  const modifyLayouts = (initialLayouts: ReactGridLayout.Layouts, layoutKeys: ILayoutKey[]): Record<ILayoutKey, any[]> => {
    const modifiedLayouts: Record<ILayoutKey, any[]> = layoutKeys.reduce(
      (acc, layoutKey) => {
        acc[layoutKey] = initialLayouts[layoutKey].map((item: any) => ({ ...item, static: true }));
        return acc;
      },
      {} as Record<ILayoutKey, any[]>
    );

    return modifiedLayouts;
  }

  const getInitLayout = () => {
    if (canEdit) {
      return initialLayouts
    } else {
      return modifyLayouts(initialLayouts, layoutKeys)
    }
  }

  const getFromLS = (key: any) => {
    let ls: Record<any, any> = {};
    try {
      ls = getStorageItem(page) || {};
    } catch (e) {
      // no item in local storage
    }
    return ls[key];
  }

  const saveToLS = (key: any, value: any) => {
    setStorageItem(page, JSON.stringify({
      [key]: value,
    }))
  }

  const [layouts, setLayouts] = useState(
    getFromLS('layouts') || getInitLayout(),
  );

  const onLayoutChange = (_: any, allLayouts: any) => {
    setLayouts(allLayouts);
    if (autoSave) {
      saveToLS('layouts', allLayouts);
    }
  };

  const onLayoutSave = () => {
    saveToLS('layouts', layouts);
  };



  return (
    <>
      <TopBar
        onLayoutSave={onLayoutSave}
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={Object.keys(componentList)}
        heading={heading}
        canEdit={canEdit}
        autoSave={autoSave}
      />
      <ResponsiveGridLayout
        isDraggable={canEdit}
        isResizable={canEdit}
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 }}
        rowHeight={10}
        onLayoutChange={onLayoutChange}
      >
        {items.map((key: any) => (
          <div
            key={key}
            className="widget"
            data-grid={{ w: key.w, h: key.h, x: key.x, y: key.y }}
          >
            <Widget
              id={key}
              onRemoveItem={onRemoveItem}
              component={componentList[key].component}
              showBorder={componentList[key].showBorder}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}