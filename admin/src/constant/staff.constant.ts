export const title = [
    {
        title: "Name",
        colSpan: "col-span-2",
    },
    {
        title: "Phone",
        colSpan: "col-span-2",
    },
    {
        title: "Role",
        colSpan: "col-span-1",
    },
    {
        title: "Status",
        colSpan: "col-span-1",
    },
    {
        title: "Action",
        colSpan: "col-span-1",
    },
];

const statusList = {
    "pending": "text-pending opacity-50",
    "active": "text-delivered opacity-50",
    "banned": "text-banned opacity-50",
    "off": "text-off opacity-50",
};
const statusBackground = {
    "pending": "bg-pending",
    "active": "bg-delivered",
    "banned": "bg-banned",
    "off": "bg-off",
}
export const statusMap1 = new Map(Object.entries(statusList));
export const statusMap2 = new Map(Object.entries(statusBackground));