import {getShipperById} from '../../pages/Shipper/shipper.service';

export const getShipper = async (id: string) => {
    return await getShipperById(id);
}

export const fetchShipperInformation = async (id: string) => {
    const rs = await getShipperById(id);
    return rs?.data
}