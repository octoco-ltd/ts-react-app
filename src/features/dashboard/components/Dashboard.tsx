
import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import TopBar from './TopBar';
import Widget from './Widget';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { IComponentList } from '../models/dashboardTypes';
const ResponsiveGridLayout = WidthProvider(Responsive);

// TODO: TYPES, make so that you can optionally give a list of components and layout, editable or not, move storage to the util/hook items, responsive layout
// https://javascript.plainenglish.io/tired-of-boring-static-dashboards-lets-build-a-fully-customizable-dashboard-in-react-88cb5369cfe1
// if you are a developer, you can always edit and get layout etc
// build custom devops items
// does not save removed items
// remove button optional

interface DashboardProps{
  canEdit?: boolean //whether the user can move / remove /add the components around 
  initialLayouts: ReactGridLayout.Layouts
  componentList: IComponentList
  heading: string
  page: string
}

export default function Content({initialLayouts, canEdit = true, componentList, heading, page}: DashboardProps) {
  
  const [items, setItems] = useState<any>(Object.keys(componentList));
  
  const onRemoveItem = (itemId: any) => {
    setItems(items.filter((i: any) => i !== itemId));
  };

  const onAddItem = (itemId: any) => {
    setItems([...items, itemId]);
  };

  type LayoutKey = 'lg' | 'md' | 'sm' | 'xs' | 'xxs'; 
  const layoutKeys: LayoutKey[] = Object.keys(initialLayouts) as LayoutKey[];

  const modifyLayouts = (initialLayouts: any, layoutKeys: LayoutKey[]): Record<LayoutKey, any[]> => {
    const modifiedLayouts: Record<LayoutKey, any[]> = layoutKeys.reduce(
      (acc, layoutKey) => {
        acc[layoutKey] = initialLayouts[layoutKey].map((item: any) => ({ ...item, static: true }));
        return acc;
      },
      {} as Record<LayoutKey, any[]>
    );
  
    return modifiedLayouts;
  }

  const getInitLayout = () => {
    if(canEdit){
      return initialLayouts
    }else{
      return modifyLayouts(initialLayouts, layoutKeys)
    }
  }

  const [layouts, setLayouts] = useState(
    getFromLS('layouts') || getInitLayout(),
  );

  const onLayoutChange = (_: any, allLayouts: any) => {
    setLayouts(allLayouts);
  };

  const onLayoutSave = () => {
    saveToLS('layouts', layouts);
  };

  function getFromLS(key: any) {
    let ls: any = {};
    if (localStorage) {
      try {
        ls = JSON.parse(localStorage.getItem(page) ?? '') || {};
      } catch (e) {
        // no item in local storage
      }
    }
    return ls[key];
  }

  function saveToLS(key: any, value: any) {
    if (localStorage) {
      localStorage.setItem(
        page,
        JSON.stringify({
          [key]: value,
        }),
      );
    }
  }
  
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
      />
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={80}
        onLayoutChange={onLayoutChange}
      >
        {items.map((key: any) => (
          <div
            key={key}
            className="widget"
            data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
          >
            <Widget
              id={key}
              onRemoveItem={onRemoveItem}
              component={componentList[key]}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}