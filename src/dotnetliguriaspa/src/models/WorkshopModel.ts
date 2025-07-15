import { TrackModel } from "./TrackModel";
import { LocationModel } from "./LocationModel";

export interface WorkshopModel {
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
  location: LocationModel;
  tracks: TrackModel[];
  oldUrl: string;
  slug: string;
}
