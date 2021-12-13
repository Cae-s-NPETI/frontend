<script lang="ts">
    import type { AxiosResponse } from "axios";
    import { onDestroy, onMount } from "svelte";

    import { tripHistory, tripManagement } from "../axois";
    import type {
        Driver,
        FullTrip,
        LoginStoreAssert,
        OngoingTrip,
        User,
    } from "../structures";

    export let lInfo: LoginStoreAssert;

    let available: boolean | null;
    let trip: OngoingTrip;
    let checkAssignedTimer: ReturnType<typeof setInterval>;

    // Load props
    onMount(() => {
        updateAvailable();
        // spin the check every 1s
        checkAssignedTimer = setInterval(checkAssigned, 1000);
    });

    // avoid leaking - clear the timer
    onDestroy(() => {
        clearInterval(checkAssignedTimer);
    });

    async function updateAvailable() {
        let resp;
        try {
            resp = await tripManagement.get("driver/" + lInfo.userId);
        } catch (e) {
            available = false;
            return;
        }
        available = true;
    }

    async function setAvailable(set: boolean = true) {
        if (set) {
            try {
                await tripManagement.post("driver", {
                    driverId: lInfo.userId,
                });
            } catch (e) {}
        } else {
            try {
                await tripManagement.delete("driver/" + lInfo.userId);
            } catch (e) {}
        }
        updateAvailable();
    }

    // Periodically check for assigned trip
    async function checkAssigned() {
        let resp: AxiosResponse;
        try {
            resp = await tripManagement.get(`driver/${lInfo.userId}/trip`);
        } catch (e) {
            return;
        }
        const { tripId, postalCode, passengerId } = resp.data;
        trip = {
            id: tripId,
            postalCode,
            passengerId,
            driverId: lInfo.userId,
        };
    }
</script>

<p>
    Your Assignment Status: <b
        >{available == null
            ? "checking..."
            : available
            ? "available"
            : "unavailable"}</b
    >
</p>
<input
    type="button"
    on:click={() => setAvailable(true)}
    value="Set as available"
/>
<input
    type="button"
    on:click={() => setAvailable(false)}
    value="Set as unavailable"
/>

<h1>My Assigned Trip</h1>
{#if trip}
    O
{:else}
    <div style="text-align:center">
        You currently have no assigned trip yet.
        {#if available == false}
            <span style="color:red">
                <br />
                Remember to set your status to <b><i>available</i></b> to let the
                system assign a passenger to you.
            </span>
        {/if}
        <p>
            <i>
                Whom shall be the one to receive your sled?
                <br />Stay around while we find your santa... :)
            </i>
        </p>
    </div>
{/if}
