
import axiosInstance from "../axios";
const url = 'order/'


let orderService = {
    getAllOrder,
    getDashboardData
}

// Get all menu
function getAllOrder(config, data) {
    return axiosInstance.get(url + 'getAll');
};
// Get all dashboard data
function getDashboardData() {
    return axiosInstance.get('latestOrderMenu/getAll');
};

export default orderService;