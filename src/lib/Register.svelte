<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import type { Driver, User } from "./structures";

    const dispatch = createEventDispatcher();


    let userType: "driver" | "passenger";
    let errorTxt;

    let firstName;
    let lastName;
    let mobileNo;
    let email;

    let identificationNo;
    let carNo;

    function doRegister() {
        if (!userType) {
            errorTxt = "needs to select user type";
            return;
        }
        if (!(firstName && lastName && mobileNo && email)) {
            errorTxt = "please fill in all the fields";
            return;
        }
        if (userType == "driver" && !(identificationNo && carNo)) {
            errorTxt = "please fill in all the fields";
            return;
        }

        dispatch("success")
    }
</script>

<h1>Register</h1>
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
    <input type="radio" bind:group={userType} name="userType" value="driver" />
    Driver
</label>

<h2>Enter details</h2>

<input type="text" bind:value={firstName} placeholder="First name" required />
<input type="text" bind:value={lastName} placeholder="Last name" />
<input type="text" bind:value={mobileNo} placeholder="Mobile number" />
<input type="text" bind:value={email} placeholder="Email address" />

{#if userType == "driver"}
    <h2>Mandatory driver fields</h2>
    <input type="text" bind:value={identificationNo} placeholder="Identification number" />
    <input type="text" bind:value={carNo} placeholder="Car number" />
{/if}

{#if errorTxt }
<p style="color:red">{errorTxt}</p>
{/if}

<input type="button" on:click={doRegister} value="Register" />
