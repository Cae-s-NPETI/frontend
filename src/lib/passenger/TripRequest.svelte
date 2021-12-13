<script lang="ts">
    import { getDriver } from "$lib/utils";
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
        if (!postalCode) {
            errorTxt = "please fill in the postal code";
            return;
        }

        const resp = await tripManagement.post("trips", {
            passengerId: lInfo.userId,
            postalCode,
        });

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
