import AsyncStorage from '@react-native-async-storage/async-storage';
const storeData = async (key, value) => {
    try {
        console.log(value)
      await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e)
    }
  };

  const getData = async (key) => {
    return new Promise((accepted, rejected) => {
        try {
            const value = AsyncStorage.getItem(key);
            if (value !== null) {
                console.log(value)
              return accepted(value)
            }
          } catch (e) {
            rejected(e)
          }
    })
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log(e)
    }
  
    console.log('Done.')
  }

  export default { storeData, getData, clearAll}