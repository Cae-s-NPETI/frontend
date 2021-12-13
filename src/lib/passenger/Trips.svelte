<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import { tripHistory } from "../axois";
    import type { FullTrip, LoginStoreAssert } from "../structures";

    export let lInfo: LoginStoreAssert;

    let errorTxt;
    let trips: FullTrip[] = [];

    // Load props
    onMount(updateFields);

    function setStatus(statusOk: boolean, text: string) {
        if (statusOk) {
            errorTxt = null;
        } else {
            errorTxt = text;
        }
    }

    async function updateFields() {
        let resp;
        try {
            resp = await tripHistory.get("passengerTrips/" + lInfo.userId);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setStatus(false, `failed: ${e.response.data["description"]}`);
            } else {
                setStatus(false, `failed: ${e}`);
            }
            return;
        }
        trips = resp.data["trips"] as FullTrip[];
    }
</script>

<h1>Trip History</h1>

{#each trips as trip, i (trip)}
    <p>
        ID: {trip.id}; Postal: {trip.postalCode}; Driver: {trip.driverId}; {new Date(
            trip.startTime * 1000
        ).toString()} to {new Date(trip.endTime * 1000).toString()}
    </p>
{/each}
