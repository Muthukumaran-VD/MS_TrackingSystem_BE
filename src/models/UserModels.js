// models/UserModels.js

// Define the model for the 'listmsaccounttrackings' table with data types
const UserModel = {
    ID: {
        type: 'VARCHAR(255)',
        description: 'Unique identifier for each record'
    },
    BGV_ID: {
        type: 'VARCHAR(255)',
        description: 'Background verification ID'
    },
    Request_ID: {
        type: 'VARCHAR(255)',
        description: 'Request ID for the verification process'
    },
    Position_Type: {
        type: 'VARCHAR(255)',
        description: 'Type of position (e.g., Full-time, Part-time)'
    },
    PO_Number: {
        type: 'VARCHAR(255)',
        description: 'Purchase Order Number'
    },
    Project: {
        type: 'VARCHAR(255)',
        description: 'Project associated with the resource'
    },
    MS_Employee_ID: {
        type: 'VARCHAR(255)',
        description: 'Employee ID in the MS system'
    },
    V_Account: {
        type: 'VARCHAR(255)',
        description: 'Virtual account number'
    },
    First_Name: {
        type: 'VARCHAR(255)',
        description: 'First name of the resource'
    },
    Last_Name: {
        type: 'VARCHAR(255)',
        description: 'Last name of the resource'
    },
    Middle_Name: {
        type: 'VARCHAR(255)',
        description: 'Middle name of the resource (optional)'
    },
    Resource_Name: {
        type: 'VARCHAR(255)',
        description: 'Full name of the resource'
    },
    Legal_Name: {
        type: 'VARCHAR(255)',
        description: 'Legal name of the resource'
    },
    VueData_Employee_ID: {
        type: 'VARCHAR(255)',
        description: 'Employee ID in the VueData system'
    },
    VueData_Email: {
        type: 'VARCHAR(255)',
        description: 'Email address of the employee'
    },
    Phone_Number: {
        type: 'VARCHAR(15)',
        description: 'Phone number of the resource'
    },
    Client_Partner: {
        type: 'VARCHAR(255)',
        description: 'Client partner name'
    },
    Client_Partner_Email: {
        type: 'VARCHAR(255)',
        description: 'Email address of the client partner'
    },
    Client_Manager: {
        type: 'VARCHAR(255)',
        description: 'Client manager name'
    },
    Client_Manager_Email: {
        type: 'VARCHAR(255)',
        description: 'Email address of the client manager'
    },
    Client_Lead: {
        type: 'VARCHAR(255)',
        description: 'Client lead name'
    },
    Client_Lead_Email: {
        type: 'VARCHAR(255)',
        description: 'Email address of the client lead'
    },
    BGV_Submission_Date: {
        type: 'DATE',
        description: 'Date when the BGV was submitted'
    },
    BGV_Completion_Date: {
        type: 'DATE',
        description: 'Date when the BGV was completed'
    },
    ECA_Submission_Date: {
        type: 'DATE',
        description: 'Date when the ECA was submitted'
    },
    ECA_Completion_Date: {
        type: 'DATE',
        description: 'Date when the ECA was completed'
    },
    Expiry_Date: {
        type: 'DATE',
        description: 'Expiry date of the resource'
    },
    Max_Policy_Expiry_Date: {
        type: 'DATE',
        description: 'Max policy expiry date'
    },
    Work_Start_Date: {
        type: 'DATE',
        description: 'Work start date of the resource'
    },
    OnSite_Offshore: {
        type: 'VARCHAR(255)',
        description: 'Whether the resource is on-site or offshore'
    },
    Employment_Type: {
        type: 'VARCHAR(255)',
        description: 'Employment type (e.g., contract, full-time)'
    },
    Primary_Skills: {
        type: 'VARCHAR(255)',
        description: 'Primary skills of the resource'
    },
    Secondary_Skills: {
        type: 'VARCHAR(255)',
        description: 'Secondary skills of the resource (optional)'
    },
    Resource_Status: {
        type: 'VARCHAR(255)',
        description: 'Current status of the resource (e.g., active, inactive)'
    },
    Billing_Status: {
        type: 'VARCHAR(255)',
        description: 'Billing status of the resource'
    }
};

module.exports = UserModel;
