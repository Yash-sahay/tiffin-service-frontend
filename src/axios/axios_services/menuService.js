
import axiosInstance from "../axios";
const url = 'menu/'


let menuService = {
    getAllMenu
}

// Get all menu
function getAllMenu(config, data) {
    return axiosInstance.get(url + 'getAll');
};

export default menuService;