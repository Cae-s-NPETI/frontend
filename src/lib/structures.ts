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

export type LoginStore = {
    loggedIn: false
} | {
    loggedIn: true;
    userType: "passenger" | "driver";
    userId: number;
};
