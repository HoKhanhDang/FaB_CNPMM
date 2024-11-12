export const title = [
    {
        title: "ID",
        colSpan: "col-span-1",
        justify: "justify-center",
    },
    {
        title: "Name",
        colSpan: "col-span-2",
        justify: "justify-start",
    },
    {
        title: "Phone",
        colSpan: "col-span-2",
        justify: "justify-start",
    },
    {
        title: "Status",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
    {
        title: "",
        colSpan: "col-span-1",
        justify: "justify-start",
    },
];

const statusList = {
    pending: "text-pending opacity-50",
    active: "text-delivered opacity-50",
    banned: "text-cancelled opacity-50",
    off: "text-off opacity-50",
};

const statusBackground = {
    pending: "bg-pending ",
    active: "bg-delivered",
    banned: "bg-cancelled",
    off: "bg-off",
};
export const statusMap1 = new Map(Object.entries(statusList));
export const statusMap2 = new Map(Object.entries(statusBackground));
