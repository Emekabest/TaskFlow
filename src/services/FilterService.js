import FilterRepository from "../repository/FilterRepository";


class FilterService {

    async setFilter(filter){
        await FilterRepository.setFilter(filter);

    }

    async getFilter(){
        return await FilterRepository.getFilter();
    }

}


export default new FilterService();