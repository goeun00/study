import { atom } from "jotai";

export const exclusiveDeliveryMethodAtom = atom();
export const multiDeliveryMethodsAtom = atom([]);
export const activeCategoryAtom = atom();
export const activeBrandAtom = atom([]);
export const filterButtonActiveAtom = atom(false);

export const selectedValuesAtom = atom(
  (get) =>
    (get(exclusiveDeliveryMethodAtom) ? 1 : 0) +
    (get(activeCategoryAtom) ? 1 : 0) +
    get(multiDeliveryMethodsAtom).length +
    get(activeBrandAtom).length
);

export const resetFiltersAtom = atom(null, (get, set) => {
  set(exclusiveDeliveryMethodAtom, null);
  set(multiDeliveryMethodsAtom, []);
  set(activeCategoryAtom, null);
  set(activeBrandAtom, []);
});
