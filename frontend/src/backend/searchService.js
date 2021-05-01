import {config, appFetch} from './appFetch';

export const findSportingEvents = ({provinceId, sportingEventTypeId, startDate, endDate, page},
                                   onSuccess) => {

    let path = `/search/sportTests?page=${page}`;

    path += provinceId ? `&provinceId=${provinceId}` : "";
    path += sportingEventTypeId ? `&sportingEventTypeId=${sportingEventTypeId}` : "";
    path += startDate ? `&startDate=${startDate}` : "";
    path += endDate ? `&endDate=${endDate}` : "";

    appFetch(path, config('GET'), onSuccess);

}

export const findAllProvinces = (onSuccess) =>
    appFetch('/search/provinces', config('GET'), onSuccess);

export const findAllSportingEventTypes = (onSuccess) =>
    appFetch('/search/sportTestTypes', config('GET'), onSuccess);

export const findBySportingEventId = (id, onSuccess) =>
    appFetch(`/search/sportTests/${id}`, config('GET'), onSuccess);