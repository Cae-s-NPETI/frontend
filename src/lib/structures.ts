export type User = {
    id: number;
    firstName: string;
    lastName: string;
    mobileNo: string;
    email: string;
}

export type Passenger = User;

export type Driver = User & {
    identificationNo: string;
    carNo: string;
};

export type Trip = {
    id: number;
    postalCode: string;
    passengerId: number;
    driverId: number;
}

export type OngoingTrip = Trip & {
    startTime?: number;
}

export type FullTrip = Trip & {
    startTime: number;
    endTime: number;
}

export type LoginStoreAssert = {
    loggedIn: true;
    userType: "passenger" | "driver";
    userId: number;
};

export type LoginStore = {
    loggedIn: false
} | LoginStoreAssert;
