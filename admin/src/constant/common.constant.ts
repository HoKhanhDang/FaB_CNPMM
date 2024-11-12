import path from "../utils/path";
import React from "react";

import {
    LiaChalkboardSolid,
    LiaAlgolia,
    LiaUserTieSolid,
    LiaUser,
    LiaClipboardListSolid,
    LiaBoxSolid,
    LiaLuggageCartSolid,
    LiaUsersCogSolid,
    LiaHistorySolid,
    LiaBellSolid,
    LiaCalendar,
    LiaLayerGroupSolid,
} from "react-icons/lia";

export const sideBarItems = [
    {
        id: 1,
        name: "Dashboard",
        link: path.home,
        icon: React.createElement(LiaChalkboardSolid),
        permission: "View Dashboard",
    },
    {
        id: 2,
        name: "Staff",
        link: path.staff,
        icon: React.createElement(LiaUserTieSolid),
        permission: "Manage Staff",
    },
    {
        id: 3,
        name: "Customer",
        link: path.customer,
        icon: React.createElement(LiaUser),
        permission: "Manage Users",
    },
    {
        id: 4,
        name: "Menu",
        link: path.menu,
        icon: React.createElement(LiaClipboardListSolid),
        permission: "Manage Menu",
    },
    {
        id: 5,
        name: "Ingredient",
        link: path.ingredient,
        icon: React.createElement(LiaBoxSolid),
        permission: "Manage Ingredients",
    },
    {
        id: 6,
        name: "Order",
        link: path.order,
        icon: React.createElement(LiaLuggageCartSolid),
        permission: "Manage Orders",
    },

    {
        id: 7,
        name: "History",
        link: path.history,
        icon: React.createElement(LiaHistorySolid),
        permission: "Manage History",
    },
    {
        id: 8,
        name: "Kitchen",
        link: path.kitchen,
        icon: React.createElement(LiaAlgolia),
        permission: "Manage Kitchen",
    },
    {
        id: 9,
        name: "Notification",
        link: path.notification,
        icon: React.createElement(LiaBellSolid),
        permission: "Manage Notification",
    },
    {
        id: 10,
        name: "Schedule",
        link: path.schedule,
        icon: React.createElement(LiaCalendar),
        permission: "Manage Schedule",
    },
    {
        id: 11,
        name: "Profile",
        link: path.profile,
        icon: React.createElement(LiaUsersCogSolid),
        permission: "Manage Profile",
    },
    {
        id: 12,
        name: "Layout",
        link: path.grid,
        icon: React.createElement(LiaLayerGroupSolid),
        permission: "Manage Layout",
    },
];
