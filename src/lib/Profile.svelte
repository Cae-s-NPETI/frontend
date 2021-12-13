<script lang="ts">
    import type { AxiosError, AxiosResponse } from "axios";
    import axios from "axios";
    import { onMount } from "svelte";

    import { accountManagement } from "./axois";
    import type { Driver, LoginStoreAssert, User } from "./structures";

    export let lInfo: LoginStoreAssert;

    let errorTxt;
    let successTxt;

    let firstName;
    let lastName;
    let mobileNo;
    let email;

    let identificationNo;
    let carNo;

    // Load props
    onMount(updateFields);

    function setStatus(statusOk: boolean, text: string) {
        if (statusOk) {
            errorTxt = null;
            successTxt = text;
        } else {
            errorTxt = text;
            successTxt = null;
        }
    }

    async function updateFields() {
        let resp: AxiosResponse;
        try {
            switch (lInfo.userType) {
                case "driver": {
                    resp = await accountManagement.get(
                        "drivers/" + lInfo.userId
                    );
                    break;
                }
                case "passenger": {
                    resp = await accountManagement.get(
                        "passengers/" + lInfo.userId
                    );
                    break;
                }
            }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setStatus(false, `failed: ${e.response.data["description"]}`);
            } else {
                setStatus(false, `failed: ${e}`);
            }
            return;
        }
        const user = resp.data as User;
        firstName = user.firstName;
        lastName = user.lastName;
        mobileNo = user.mobileNo;
        email = user.email;

        if (lInfo.userType == "driver") {
            const driver = user as Driver;
            identificationNo = driver.identificationNo;
            carNo = driver.carNo;
        }
    }

    async function doEditProfile() {
        if (!(firstName && lastName && mobileNo && email)) {
            setStatus(false, "please fill in all the fields");
            return;
        }
        if (lInfo.userType == "driver" && !(identificationNo && carNo)) {
            setStatus(false, "please fill in all the fields");
            return;
        }

        let resp;
        try {
            switch (lInfo.userType) {
                case "driver": {
                    resp = await accountManagement.put(
                        "drivers/" + lInfo.userId,
                        {
                            firstName,
                            lastName,
                            mobileNo,
                            email,
                            carNo,
                        }
                    );
                    break;
                }
                case "passenger": {
                    resp = await accountManagement.put(
                        "passengers/" + lInfo.userId,
                        {
                            firstName,
                            lastName,
                            mobileNo,
                            email,
                        }
                    );
                    break;
                }
            }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setStatus(false, `failed: ${e.response.data["description"]}`);
            } else {
                setStatus(false, `failed: ${e}`);
            }
            return;
        }
        const data = resp.data as { id: number };

        // Will update
        setStatus(true, "Fetching data...");
        await updateFields();
        setStatus(true, "Updated!");
    }
</script>

<h1>Profile</h1>

{#if successTxt}
    <span class="green_bold">{successTxt}</span>
{/if}

<h2>Enter details</h2>

<input type="text" bind:value={firstName} placeholder="First name" required />
<input type="text" bind:value={lastName} placeholder="Last name" />
<input type="text" bind:value={mobileNo} placeholder="Mobile number" />
<input type="text" bind:value={email} placeholder="Email address" />

{#if lInfo.userType == "driver"}
    <h2>Mandatory driver fields</h2>
    <input
        type="text"
        bind:value={identificationNo}
        placeholder="Identification number"
        disabled
    />
    <input type="text" bind:value={carNo} placeholder="Car number" />
{/if}

{#if errorTxt}
    <p style="color:red">{errorTxt}</p>
{/if}

<input type="button" on:click={doEditProfile} value="Edit Profile" />

<style>
    .green_bold {
        color: green;
        font-weight: bold;
    }
</style>
