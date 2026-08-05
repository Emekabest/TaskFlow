import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import {Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins"
import {Inter_400Regular, Inter_500Medium, Inter_600SemiBold} from "@expo-google-fonts/inter"
import { useFonts } from 'expo-font';
import FilterService from './src/services/FilterService';
import { useEffect } from 'react';
import SortService from './src/services/SortService';
import {SORT} from './src/constants/sort';
import { FILTER } from './src/constants/filter';

// Main app entry point that loads custom fonts before rendering the navigator.
export default function App() {


useEffect(()=>{
  const getFilter= async()=>{

     const filter = await FilterService.getFilter();

     if (filter === null) {
        await FilterService.setFilter(FILTER.ALL);
     }


  }




  getFilter();
},[])


useEffect(()=>{

  const getSort = async()=>{

    const sort = await SortService.getSort();

    

    if (sort === null){
      await SortService.setSort(SORT.OLDEST)
    }

  }

  getSort()//
},[])



const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,

    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold

  })


if (!fontsLoaded) { 

  return null;
}



  return (
      <AppNavigator />
  );
}

