import AsyncStorage from "@react-native-async-storage/async-storage";


const STORAGE_KEY = "sort_";


class SortRepository {

    STORAGE_KEY = "sort_"

   async setSort(sort) {
       await AsyncStorage.setItem(this.STORAGE_KEY, sort);///

    }

    async getSort(){
        
        return await AsyncStorage.getItem(this.STORAGE_KEY);
    }


}


export default new SortRepository();