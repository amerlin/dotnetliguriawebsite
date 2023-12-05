import { Track } from "./Track";

export interface Workshop {
  workshopId: string;
  title: string;
  description: string;
  creationDate: Date;
  eventDate: Date;
  blogHtml: string;
  image: string;
  tags: string;
  published: boolean;
  isExternalEvent: boolean;
  externalRegistration: boolean;
  externalRegistrationLink: string;
  onlyHtml: boolean;
  location: Location;
  tracks: Track[];
  oldUrl: string;
  slug: string;
}
