<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatcher = createEventDispatcher();
    let userType: "driver" | "passenger";
    let userId;

    function doLogin() {

    }
</script>

<h1>Login</h1>
<h2>Login as</h2>
<label>
	<input type="radio" bind:group={userType} name="userType" value="passenger">
	Passenger
</label>
<label>
	<input type="radio" bind:group={userType} name="userType" value="driver">
	Driver
</label>
<h2>User ID to log in as</h2>
<input type="text" bind:value={userId} placeholder="Enter the user ID"/>
<input type="button" on:click={doLogin} value="Login"/>