<script lang="ts">
    import type { AxiosError } from "axios";
    import axios from "axios";

    import { createEventDispatcher } from "svelte";
    import { accountManagement } from "./axois";
    import Login from "./Login.svelte";

    import type { Driver, User } from "./structures";

    const dispatch = createEventDispatcher();

    let userType: "driver" | "passenger";
    let errorTxt;
    let registeredId;

    let firstName;
    let lastName;
    let mobileNo;
    let email;

    let identificationNo;
    let carNo;

    async function doRegister() {
        if (!userType) {
            errorTxt = "needs to select user type";
            return;
        }
        if (!(firstName && lastName && mobileNo && email)) {
            errorTxt = "please fill in all the fields";
            return;
        }
        switch (userType) {
            case "driver":
            case "passenger":
                break;
            default:
                errorTxt = "r u trying 2 trick me";
                return;
        }
        if (userType == "driver" && !(identificationNo && carNo)) {
            errorTxt = "please fill in all the fields";
            return;
        }

        let resp;
        try {
            switch (userType) {
                case "driver": {
                    resp = await accountManagement.post("drivers", {
                        firstName,
                        lastName,
                        mobileNo,
                        email,
                        identificationNo,
                        carNo
                    });
                    break;
                }
                case "passenger": {
                    resp = await accountManagement.post("passengers", {
                        firstName,
                        lastName,
                        mobileNo,
                        email,
                    });
                    break;
                }
            }
        } catch (e) {
            errorTxt = `failed: ${e}`;
            if (axios.isAxiosError(e)) {
                errorTxt = `failed: ${e.response.data["description"]}`;
            }
            return;
        }
        const data = resp.data as { id: number };

        // Will update
        registeredId = data.id;
    }
</script>

<h1>Register</h1>

{#if registeredId}
    <p>
        Thank you for registering, <span class="green_bold"
            >{firstName}
            {lastName}</span
        >. Your ID is:
        <span class="green_bold">{registeredId}</span>
    </p>
    <p>
        Account Type: <span class="green_bold"
            >{userType == "driver" ? "Driver" : "Passenger"}</span
        >
    </p>

    <Login />
{:else}
    <h2>Register as</h2>
    <label>
        <input
            type="radio"
            bind:group={userType}
            name="userType"
            value="passenger"
        />
        Passenger
    </label>
    <label>
        <input
            type="radio"
            bind:group={userType}
            name="userType"
            value="driver"
        />
        Driver
    </label>

    <h2>Enter details</h2>

    <input
        type="text"
        bind:value={firstName}
        placeholder="First name"
        required
    />
    <input type="text" bind:value={lastName} placeholder="Last name" />
    <input type="text" bind:value={mobileNo} placeholder="Mobile number" />
    <input type="text" bind:value={email} placeholder="Email address" />

    {#if userType == "driver"}
        <h2>Mandatory driver fields</h2>
        <input
            type="text"
            bind:value={identificationNo}
            placeholder="Identification number"
        />
        <input type="text" bind:value={carNo} placeholder="Car number" />
    {/if}

    {#if errorTxt}
        <p style="color:red">{errorTxt}</p>
    {/if}

    <input type="button" on:click={doRegister} value="Register" />
{/if}

<style>
    .green_bold {
        color: green;
        font-weight: bold;
    }
</style>
