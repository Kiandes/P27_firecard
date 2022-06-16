import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store';

// Provides a correctly typed hook for dispatch.
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Provides a correctly typed hook for selector (gets information from the state).
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
