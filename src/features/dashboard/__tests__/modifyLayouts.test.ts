// import { ILayoutKey } from "../models/dashboardTypes";


// describe('modifyLayouts', () => {
//   it('should modify layouts with static property', () => {
//     const initialLayouts: ReactGridLayout.Layouts = {
//       lg: [{ x: 0, y: 0, w: 2, h: 3 }],
//       md: [{ x: 1, y: 1, w: 3, h: 2 }],
//     };

//     const layoutKeys: ILayoutKey[] = ['lg', 'md'];

//     const expectedModifiedLayouts: Record<ILayoutKey, any[]> = {
//       lg: [{ x: 0, y: 0, w: 2, h: 3, static: true }],
//       md: [{ x: 1, y: 1, w: 3, h: 2, static: true }],
//     };

//     const modifiedLayouts = modifyLayouts(initialLayouts, layoutKeys);

//     expect(modifiedLayouts).toEqual(expectedModifiedLayouts);
//   });

//   it('should return an empty object when layoutKeys is empty', () => {
//     const initialLayouts: ReactGridLayout.Layouts = {
//       lg: [{ x: 0, y: 0, w: 2, h: 3 }],
//     };

//     const layoutKeys: ILayoutKey[] = [];

//     const modifiedLayouts = modifyLayouts(initialLayouts, layoutKeys);

//     expect(modifiedLayouts).toEqual({});
//   });

//   it('should handle layout keys not present in initialLayouts', () => {
//     const initialLayouts: ReactGridLayout.Layouts = {
//       lg: [{ x: 0, y: 0, w: 2, h: 3 }],
//     };

//     const layoutKeys: ILayoutKey[] = ['lg', 'md'];

//     const expectedModifiedLayouts: Record<ILayoutKey, any[]> = {
//       lg: [{ x: 0, y: 0, w: 2, h: 3, static: true }],
//       md: [], // Empty array for missing key
//     };

//     const modifiedLayouts = modifyLayouts(initialLayouts, layoutKeys);

//     expect(modifiedLayouts).toEqual(expectedModifiedLayouts);
//   });

//   // Negative test cases

//   it('should throw an error when initialLayouts is not provided', () => {
//     const layoutKeys: ILayoutKey[] = ['lg'];

//     expect(() => modifyLayouts(undefined, layoutKeys)).toThrow('initialLayouts is required');
//   });

//   it('should return an empty object when both initialLayouts and layoutKeys are empty', () => {
//     const initialLayouts: ReactGridLayout.Layouts = {};
//     const layoutKeys: ILayoutKey[] = [];

//     const modifiedLayouts = modifyLayouts(initialLayouts, layoutKeys);

//     expect(modifiedLayouts).toEqual({});
//   });

//   it('should handle null layout items', () => {
//     const initialLayouts: ReactGridLayout.Layouts = {
//       lg: [null],
//     };
//     const layoutKeys: ILayoutKey[] = ['lg'];

//     const expectedModifiedLayouts: Record<ILayoutKey, any[]> = {
//       lg: [{ static: true }], // null item should be replaced
//     };

//     const modifiedLayouts = modifyLayouts(initialLayouts, layoutKeys);

//     expect(modifiedLayouts).toEqual(expectedModifiedLayouts);
//   });

//   it('should handle missing layout keys in initialLayouts', () => {
//     const initialLayouts: ReactGridLayout.Layouts = {
//       lg: [{ x: 0, y: 0, w: 2, h: 3 }],
//     };
//     const layoutKeys: ILayoutKey[] = ['lg', 'md'];

//     const modifiedLayouts = modifyLayouts(initialLayouts, layoutKeys);

//     expect(modifiedLayouts).toEqual(initialLayouts);
//   });
// });
