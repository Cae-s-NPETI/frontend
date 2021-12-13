<script lang="ts">
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { accountManagement } from "./axois";

    import { login } from "./stores";
    import type { User } from "./structures";

    let userType: "driver" | "passenger";
    let errorTxt;

    let userId;

    async function doLogin() {
        if (!userType) {
            errorTxt = "needs to select user type";
            return;
        }
        if (!userId) {
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

        let resp;
        try {
            switch (userType) {
                case "driver": {
                    resp = await accountManagement.get("drivers/" + userId);
                    break;
                }
                case "passenger": {
                    resp = await accountManagement.get("passengers/" + userId);
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
        const data = resp.data as User;

        login.set({
            loggedIn: true,
            userId: data.id,
            userType,
        });
        goto(userType == "driver" ? "/driver" : "/passenger");
    }
</script>

<h1>Login</h1>
<h2>Login as</h2>
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
<h2>User ID to log in as</h2>
<input type="text" bind:value={userId} placeholder="Enter the user ID" />
{#if errorTxt}
    <p style="color:red">{errorTxt}</p>
{/if}
<input type="button" on:click={doLogin} value="Login" />
