export interface MeetupInterface {
    host: string;
    meetupName: string;
    desc: string;
    meetupTime: string;
    place: string;
    attendees: string[];
    maxattendees: number;
}
export const sortByDate = (meetups: MeetupInterface[]) => {
    return meetups.sort((a, b) => new Date(a.meetupTime).getTime() - new Date(b.meetupTime).getTime())
}