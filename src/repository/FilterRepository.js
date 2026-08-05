import AsyncStorage from "@react-native-async-storage/async-storage";



class FilterRepository {

    STORAGE_KEY = "filter_";


   async setFilter(filter) {
       await AsyncStorage.setItem(this.STORAGE_KEY, filter);

    }

    async getFilter(){
        
        return await AsyncStorage.getItem(this.STORAGE_KEY);
    }



}


export default new FilterRepository();