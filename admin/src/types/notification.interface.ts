
export default interface INotification {
    nof_id?: number;
    title: string;
    content: string;
    isRead?: number;
    type:string,
    link: string,
    time?: string | Date;
}
