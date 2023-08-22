
import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import TopBar from './TopBar';
import Widget from './Widget';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
const ResponsiveGridLayout = WidthProvider(Responsive);

// TODO: TYPES, make so that you can optionally give a list of components and layout, editable or not, move storage to the util/hook items, responsive layout
// https://javascript.plainenglish.io/tired-of-boring-static-dashboards-lets-build-a-fully-customizable-dashboard-in-react-88cb5369cfe1
// if you are a developer, you can always edit and get layout etc
// build custom devops items
// does not save removed items
//remove button optional

const initialLayouts = {
  lg: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    { i: 'd', x: 0, y: 2, w: 2, h: 2 },
  ],
};

const originalItems = ['a', 'b', 'c', 'd'];

export default function Content() {
  const [items, setItems] = useState<any>(originalItems);
  
  const onRemoveItem = (itemId: any) => {
    setItems(items.filter((i: any) => i !== itemId));
  };
  const onAddItem = (itemId: any) => {
    setItems([...items, itemId]);
  };
  const [layouts, setLayouts] = useState(
    getFromLS('layouts') || initialLayouts,
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
        ls = JSON.parse(localStorage.getItem('rgl-8') ?? '') || {};
      } catch (e) {
        console.log(e)
        console.log('error')
      }
    }
    return ls[key];
  }

  function saveToLS(key: any, value: any) {
    if (localStorage) {
      localStorage.setItem(
        'rgl-8',
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
        originalItems={originalItems}
      />
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
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
            backgroundColor="#867ae9"
          />
        </div>
      ))}
    </ResponsiveGridLayout>
    </>
    
  );
}