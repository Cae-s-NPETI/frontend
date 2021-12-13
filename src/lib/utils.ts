import type { AxiosResponse } from "axios";
import { accountManagement } from "./axois";
import type { Driver, Passenger } from "./structures";

/**
 * Gets a passenger from the API
 * @throws
 */
export async function getPassenger(id: number) {
    const resp = await accountManagement.get(
        "passengers/" + id
    );
    return resp.data as Passenger;
}

/**
 * Gets a driver from the API
 * @throws
 */
 export async function getDriver(id: number) {
    const resp = await accountManagement.get(
        "drivers/" + id
    );
    return resp.data as Driver;
}
