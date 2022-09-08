
const filterProperties = (raw: object, unallowed: string[]): object => {
    return Object.keys(raw)
      .filter((key) => !unallowed.includes(key))
      .reduce((obj, key) => {
        // @ts-ignore
        obj[key] = raw[key];
        return obj;
      }, {});
  };
  
  export default filterProperties;