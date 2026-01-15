import { TrackModel } from "./TrackModel";
import { LocationModel } from "./LocationModel";
import { WorkshopFileModel } from "./WorkshopFileModel";

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
  in_homepage: boolean;
  isExternalEvent: boolean;
  externalRegistration: boolean;
  externalRegistrationLink: string;
  onlyHtml: boolean;
  location: LocationModel;
  tracks: TrackModel[];
  oldUrl: string;
  slug: string;
  materials: WorkshopFileModel[];
  photos: WorkshopFileModel[];
}
