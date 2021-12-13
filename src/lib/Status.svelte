<script lang="ts">
    import axios from "axios";

    import { onMount } from "svelte";
    import { accountManagement, tripHistory, tripManagement } from "./axois";

    const statuses = {
        accountManagement: "checking...",
        tripHistory: "checking...",
        tripManagement: "checking...",
    };

    onMount(async () => {
        (async () => {
            try {
                const r = await accountManagement.get("");
                statuses.accountManagement = "running!";
            } catch (e) {
                statuses.accountManagement = "down :(";
            }
        })();

        (async () => {
            try {
                const r = await tripHistory.get("");
                statuses.tripHistory = "running!";
            } catch (e) {
                statuses.tripHistory = "down :(";
            }
        })();

        (async () => {
            try {
                const r = await tripManagement.get("");
                statuses.tripManagement = "running!";
            } catch (e) {
                statuses.tripManagement = "down :(";
            }
        })();
    });
</script>
<h1>Service status</h1>
<h2>Account management service</h2>
{statuses.accountManagement}

<h2>Trip history service</h2>
{statuses.tripHistory}

<h2>Trip management service</h2>
{statuses.tripManagement}
