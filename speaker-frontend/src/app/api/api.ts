export * from './text.service';
import { TextService } from './text.service';
export * from './image.service';
import { ImageService } from './image.service';
export const APIS = [TextService, ImageService];
