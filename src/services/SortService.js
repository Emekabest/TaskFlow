import SortRepository from "../repository/SortRepository";


class SortService {

    async setSort(sortBy){
        await SortRepository.setSort(sortBy);

    }

    async getSort(){


        return await SortRepository.getSort();//
    }

}


export default new SortService();