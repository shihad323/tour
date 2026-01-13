import Tour from './tour.model';
import TourType from './tour-type.model';
import { ITour, ITourType } from '../user/user.interface';

export const createTourType = async (tourTypeData: ITourType) => {
  const tourType = await TourType.create(tourTypeData);
  return tourType;
};

export const getAllTourTypes = async () => {
  const tourTypes = await TourType.find();
  return tourTypes;
};

export const createTour = async (tourData: ITour) => {
  const tour = await Tour.create(tourData);
  return tour.populate('tourType');
};

export const getAllTours = async (skip: number = 0, limit: number = 10, filter?: any) => {
  const query = { isDeleted: false, ...filter };
  const tours = await Tour.find(query)
    .populate('tourType')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Tour.countDocuments(query);

  return { tours, total };
};

export const getTourById = async (tourId: string) => {
  const tour = await Tour.findById(tourId).populate('tourType');
  if (!tour) {
    throw new Error('Tour not found');
  }
  return tour;
};

export const getTourBySlug = async (slug: string) => {
  const tour = await Tour.findOne({ slug, isDeleted: false }).populate('tourType');
  if (!tour) {
    throw new Error('Tour not found');
  }
  return tour;
};

export const updateTour = async (tourId: string, tourData: Partial<ITour>) => {
  const tour = await Tour.findByIdAndUpdate(tourId, tourData, {
    new: true,
    runValidators: true,
  }).populate('tourType');

  if (!tour) {
    throw new Error('Tour not found');
  }

  return tour;
};

export const deleteTour = async (tourId: string) => {
  // Permanently delete the tour from the database
  const tour = await Tour.findByIdAndDelete(tourId);
  if (!tour) {
    throw new Error('Tour not found');
  }
  return { message: 'Tour permanently deleted' };
};

export const searchTours = async (searchTerm: string, skip: number = 0, limit: number = 10) => {
  const query = {
    isDeleted: false,
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { location: { $regex: searchTerm, $options: 'i' } },
    ],
  };

  const tours = await Tour.find(query)
    .populate('tourType')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Tour.countDocuments(query);

  return { tours, total };
};
