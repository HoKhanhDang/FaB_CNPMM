import INotification from "../../../types/notification.interface";

interface FilterNotificationProps {
    filterValue: string;
    setFilter: (value: string) => void;
}
const FilterNotification: React.FC<FilterNotificationProps> = ({
    filterValue,
    setFilter,
}) => {
    return (
        <select name="filter" id="" value={filterValue} onChange={(e)=>setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="0">Unread</option>
            <option value="1">Read</option>
            <option value="newest">Newest</option>
            <option value="latest">Latest</option>
        </select>
    )
}
export default FilterNotification;