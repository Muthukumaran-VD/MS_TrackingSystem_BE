const { mongoose, Schema } = require('mongoose');

// The ListmsaccounttrackingSchema defines the structure and validation rules for user data in MongoDB, including various string and date fields.
// The Listmsaccounttracking model is created from this schema, allowing interaction with the corresponding MongoDB collection.

const ListmsaccounttrackingSchema = new Schema({
    ID: { type: String, required: true },
    BGV_ID: { type: String, required: true },
    Request_ID: { type: String, required: true },
    Position_Type: { type: String, required: true },
    PO_Number: { type: String, required: true },
    Project: { type: String, required: true },
    MS_Employee_ID: { type: String, required: true },
    V_Account: { type: String, required: true },
    First_Name: { type: String, required: true },
    Last_Name: { type: String, required: true },
    Middle_Name: { type: String, required: true },
    Resource_Name: { type: String, required: true },
    Legal_Name: { type: String, required: true },
    VueData_Employee_ID: { type: String, required: true },
    VueData_Email: { type: String, required: true },
    Phone_Number: { type: Number, required: true },
    Client_Partner: { type: String, required: true },
    Client_Partner_Email: { type: String, required: true },
    Client_Manager: { type: String, required: true },
    Client_Manager_Email: { type: String, required: true },
    Client_Lead: { type: String, required: true },
    Client_Lead_Email: { type: String, required: true },
    BGV_Submission_Date: { type: String, required: true },
    BGV_Completion_Date: { type: String, required: true },
    ECA_Submission_Date: { type: String, required: true },
    ECA_Completion_Date: { type: String, required: true },
    Expiry_Date: { type: Date, required: true },
    Max_Policy_Expiry_Date: { type: Date, required: true },
    Work_Start_Date: { type: Date, required: true },
    OnSite_Offshore: { type: String, required: true },
    Employment_Type: { type: String, required: true },
    Primary_Skills: { type: String, required: true },
    Secondary_Skills: { type: String, required: true },
    Resource_Status: { type: String, required: true },
    Billing_Status: { type: String, required: true },
}, { timestamps: true });


const Listmsaccounttracking = mongoose.model('listmsaccounttrackings', ListmsaccounttrackingSchema);

module.exports = { Listmsaccounttracking };
