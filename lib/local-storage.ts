export const getStoreLocal = (name: string) => {
  // if(typeof localStorage !== 'undefined'){
  //     const ls = localStorage.getItem(name)
  //     return ls ? JSON.parse(ls) : null
  // }
  // return null
  if (typeof localStorage !== "undefined") {
    const ls = localStorage.getItem(name);
    try {
      return ls ? JSON.parse(ls) : null;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return null;
    }
  }
  return null;
};
