export const listFilterOrder = [
    "Pending",
    "Processing",
    "Delivering",
    "Delivered",
    "Cancelled",
];

export const timeFilterOrder = ["One hour", "One day", "One week", "One month"];

export const title = [
    {
        title: "ID",
        colSpan: "col-span-1",
        justify: "justify-center",
    },
    {
        title: "CID",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Total price",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Message",
        colSpan: "col-span-3",
        justify: "justify-center",
    },
    {
        title: "Status",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "Delivery Time",
        colSpan: "col-span-2",
        justify: "justify-center",
    },
    {
        title: "Created At",
        colSpan: "col-span-2",
        justify: "justify-center",
    },
    {
        title: "",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
];

const statusList = {
    Pending: "text-pending opacity-50",
    Processing: " text-processing opacity-50",
    Delivering: "text-delivering opacity-50",
    Delivered: "text-delivered opacity-50",
    Cancelled: "text-cancelled opacity-50",
    Packed: "text-packed opacity-50",
    Successfully: "text-delivered opacity-50",
};
const statusBackground = {
    Pending: "bg-pending",
    Processing: "bg-processing",
    Delivering: "bg-delivering",
    Delivered: "bg-delivered",
    Cancelled: "bg-cancelled",
    Packed: "bg-packed",
    Successfully: "bg-delivered",
};
export const statusMap1 = new Map(Object.entries(statusList));
export const statusMap2 = new Map(Object.entries(statusBackground));

export const stepperList = [
    {
        label: "Pending",
        id: 0,
    },
    {
        label: "Processing",
        id: 1,
    },
    {
        label: "Packed",
        id: 2,
    },
    {
        label: "Delivering",
        id: 3,
    },
    {
        label: "Cancelled",
        id: 4,
    },
    {
        label: "Delivered",
        id: 5,
    },
    {
        label: "Successfully",
        id: 6,
    },
];
