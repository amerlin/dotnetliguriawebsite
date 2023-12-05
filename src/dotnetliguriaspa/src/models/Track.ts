export interface Track {
  workshopTrackId: string;
  title: string;
  image: string;
  startTime: Date;
  endTime: Date;
  abstract: string;
  level: number;
  speakers: string[];
  speakersName: string;
}
