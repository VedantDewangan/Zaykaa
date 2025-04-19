require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { connectionDB } = require("./Database/ConnectionDB");
const { UserRoute } = require("./Routes/UserRoutes");
const { FoodRoute } = require("./Routes/FoodRoutes");
const { CartRoute } = require("./Routes/CartRoute");
const { OrderRoute } = require("./Routes/OrderRoute");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(201).json({
        message: "Your API is working",
        success: true,
    });
});

app.use("/api", UserRoute);
app.use("/api", FoodRoute);
app.use("/api", CartRoute);
app.use("/api", OrderRoute);

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = process.env.PAYPAL_API;

async function getPayPalAccessToken() {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
    try {
        const { data } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, "grant_type=client_credentials", {
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return data.access_token;
    } catch (error) {
        console.error("Error fetching PayPal token", error.response?.data || error);
        return null;
    }
}

app.post("/create-paypal-order", async (req, res) => {
    const { totalAmount } = req.body;
    const accessToken = await getPayPalAccessToken();
    if (!accessToken) return res.status(500).json({ success: false, message: "PayPal authentication failed" });

    try {
        const { data } = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            {
                intent: "CAPTURE",
                purchase_units: [{ amount: { currency_code: "USD", value: totalAmount.toFixed(2) } }],
            },
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
        );

        res.json({ success: true, orderID: data.id });
    } catch (error) {
        console.error("Error creating PayPal order", error.response?.data || error);
        res.status(500).json({ success: false, message: "Error creating PayPal order" });
    }
});

app.post("/paypal-transaction-complete", async (req, res) => {
    const { orderID } = req.body;
    if (!orderID) return res.status(400).json({ success: false, message: "Missing orderID" });

    const accessToken = await getPayPalAccessToken();
    if (!accessToken) return res.status(500).json({ success: false, message: "PayPal authentication failed" });

    try {
        const { data } = await axios.get(`${PAYPAL_API}/v2/checkout/orders/${orderID}`, {
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        });

        if (data.status === "COMPLETED") {
            res.json({ success: true, message: "Payment successful", data });
        } else {
            res.status(400).json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.error("Error verifying PayPal payment", error.response?.data || error);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
});

connectionDB();
app.listen(PORT, () => {
    console.log(`Your backend is running on port ${PORT}`);
});
