<script lang="ts">
    import { getDriver } from "$lib/utils";
    import type { AxiosResponse } from "axios";
    import axios from "axios";
    import { tripManagement } from "../axois";
    import type { Driver, LoginStoreAssert } from "../structures";

    export let lInfo: LoginStoreAssert;

    let errorTxt;
    let successResult: {
        tripId: number;
        driver: Driver;
    };

    let postalCode;

    async function doTripRequest() {
        errorTxt = null;
        if (!postalCode) {
            errorTxt = "please fill in the postal code";
            return;
        }

        let resp: AxiosResponse;
        try {
            resp = await tripManagement.post("trips", {
                passengerId: lInfo.userId,
                postalCode,
            });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                errorTxt = e.response?.data["description"] || e;
            }
            return;
        }

        const { id: tripId, driverId } = resp.data;

        // get the driver info
        const driver = await getDriver(driverId);
        successResult = {
            tripId,
            driver,
        };
    }
</script>

<h1>Request a trip</h1>

{#if successResult}
    <h2>Your trip is ongoing.</h2>
    <p>
        Your driver is: <span class="green_bold"
            >{successResult.driver.firstName}
            {successResult.driver.lastName}</span
        >
        <br />
        The trip ID is: <span class="green_bold">{successResult.tripId}</span>
    </p>
{:else}
    <h2>Enter your pickup point</h2>

    <input type="text" bind:value={postalCode} placeholder="Postal code" />

    {#if errorTxt}
        <p style="color:red">{errorTxt}</p>
    {/if}

    <input type="button" on:click={doTripRequest} value="Request trip" />
{/if}

<style>
    .green_bold {
        color: green;
        font-weight: bold;
    }
</style>
